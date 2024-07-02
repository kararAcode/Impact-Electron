const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');
const os = require('os');

require('dotenv').config();

// Handle Squirrel events as early as possible
if (require('electron-squirrel-startup')) {
  app.quit();
  return;
}

// Set up logging
log.transports.file.level = 'info';
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

// Configure autoUpdater
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
      webSecurity: false,
    },
  });

  mainWindow.maximize();

  // Load the desired URL.
  mainWindow.loadURL('https://impact.codeninjas.com/');

  mainWindow.webContents.on('did-navigate-in-page', (event, url) => {
    // Check if we have navigated to MakeCode editor
    if (url.includes('#editor')) {
      mainWindow.webContents.send('open-makecode-editor');
    }
  });

  mainWindow.webContents.on('will-navigate', (event) => {
    let url = event.url;
    let { host } = new URL(url);

    if (host !== 'impact.codeninjas.com') {
      event.preventDefault();
    }
  });

  mainWindow.webContents.on('before-input-event', (event, input) => {
    // Option to toggle devtools if app is not in production mode
    if (input.control && input.key.toLowerCase() === 'i' && !app.isPackaged) {
      mainWindow.webContents.toggleDevTools();
      event.preventDefault();
    }

    
  });
};

// App ready event
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Check for updates
  log.info('App is ready, checking for updates...');
  autoUpdater.checkForUpdates();
  mainWindow.webContents.on('did-finish-load', () => {
    log.info('Main window loaded, sending message to check for updates.');
    mainWindow.webContents.send('message', `Checking for updates. Current version ${app.getVersion()}`);
  });
});

// Update event listeners
autoUpdater.on('checking-for-update', () => {
  log.info('Checking for updates...');
  if (mainWindow) mainWindow.webContents.send('message', 'Checking for updates...');
});

autoUpdater.on('update-available', (info) => {
  log.info('Update available:', info);
  if (mainWindow) mainWindow.webContents.send('message', `Update available. Current version ${app.getVersion()}`);
  autoUpdater.downloadUpdate().then((downloadPath) => {
    log.info(`Update downloaded to ${downloadPath}`);
    if (mainWindow) mainWindow.webContents.send('message', `Update downloaded to ${downloadPath}`);
  });
});

autoUpdater.on('update-not-available', (info) => {
  log.info('No update available:', info);
  if (mainWindow) mainWindow.webContents.send('message', `No update available. Current version ${app.getVersion()}`);
});

autoUpdater.on('error', (error) => {
  log.error('Error in auto-updater:', error);
  if (mainWindow) mainWindow.webContents.send('message', `Error in auto-updater: ${error}`);
});

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = `Download speed: ${progressObj.bytesPerSecond}`;
  log_message = `${log_message} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`;
  log.info(log_message);
  if (mainWindow) mainWindow.webContents.send('message', log_message);
});

autoUpdater.on('update-downloaded', (info) => {
  log.info('Update downloaded:', info);
  if (mainWindow) mainWindow.webContents.send('message', `Update downloaded. Current version ${app.getVersion()}`);
  autoUpdater.quitAndInstall();
});

// Global exception handler
process.on('uncaughtException', (err) => {
  log.error('Uncaught Exception:', err);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
