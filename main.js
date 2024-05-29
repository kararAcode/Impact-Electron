const { app, BrowserWindow, autoUpdater , session} = require('electron');
const path = require('node:path');
const log = require("electron-log");
require('dotenv').config()


if (app.isPackaged) {
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

  // Additional Security
  // mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  //   if (details.url.includes('impact.codeninjas.com')) {
  //     callback({ responseHeaders: details.responseHeaders });
  //   } else {
  //     callback({
  //       responseHeaders: {
  //         ...details.responseHeaders,
  //         'Content-Security-Policy': [
  //           "default-src 'self';",
  //           "script-src 'self';",
  //           "style-src 'self';",
  //           "img-src 'self';",
  //           "connect-src 'self';",
  //           "frame-src 'self';"
  //         ]
  //       }
  //     });
  //   }
  // });

  mainWindow.maximize();

  // Load the desired URL.
  mainWindow.loadURL("https://impact.codeninjas.com/");



  mainWindow.webContents.on('did-navigate-in-page', (event, url) => {
    // Check if we have navigated to makecode editor
    if (url.includes('#editor')) {
        mainWindow.webContents.send('open-makecode-editor'); // sends event to preload
    }
  });

  mainWindow.webContents.on('will-navigate', (event) => {
    let url = event.url
    let {host} = new URL(url)

    if (host !== 'imapct.codeninjas.com') {
      event.preventDefault();
    }
  })


  mainWindow.webContents.on('before-input-event', (event, input) => {
      // Option to toggle devtools if app is not in production mode
    if (input.control && input.key.toLowerCase() === 'i' && !app.isPackaged) {
      mainWindow.webContents.toggleDevTools();
      event.preventDefault();
    }
  });

  
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


