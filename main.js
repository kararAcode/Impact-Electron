const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // Optional: use preload script for better security
    }
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


