const { app, BrowserWindow } = require('electron');
const path = require('node:path');


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
  mainWindow.webContents.openDevTools();
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


