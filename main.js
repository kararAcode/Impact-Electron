const { app, BrowserWindow, autoUpdater } = require('electron');
const path = require('node:path');
require('dotenv').config()


if (app.isPackaged && process.env.NODE_ENV === 'production') {
  const server = process.env.URL;
  const url = `${server}/update/${process.platform}/${app.getVersion()}`;
  
  autoUpdater.setFeedURL({ url });

  // Check for updates and download automatically
  autoUpdater.checkForUpdates();

  autoUpdater.on('update-downloaded', () => {
    log.info('Update downloaded; will install now');
    setImmediate(() => autoUpdater.quitAndInstall());
  });

  autoUpdater.on('error', (err) => {
    log.error('Error in auto-updater. ' + err);
  });
}


// Disable web security and site isolation trials, and set user data directory
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('disable-site-isolation-trials');
app.commandLine.appendSwitch('user-data-dir', 'C:/tmp/dev');;



const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Optional: use preload script for better security,
      sandbox: false,
      webSecurity: false
    }, 
    
  });

  // Load the desired URL.
  mainWindow.loadURL("https://impact.codeninjas.com/");

  // Inject JavaScript after the DOM is ready.

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}



// Handle app lifecycle events.
app.whenReady().then(() => {

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


