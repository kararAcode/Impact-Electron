const path = require('path');
const electronInstaller = require('electron-winstaller');

const createInstaller = async () => {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: './out/impactelectron-win32-x64', // Keep this as provided
      outputDirectory: '../',                         // Keep this as provided
      authors: 'My App Inc.',
      exe: 'impactelectron.exe',
      noMsi: true,                                    // Disable creation of MSI installer
      // setupIcon: path.join(__dirname, 'assets', 'icon.ico'), // Path to the setup icon
      // iconUrl: 'http://yourwebsite.com/icon.ico',            // URL to an icon that will be used as a shortcut icon
      // loadingGif: path.join(__dirname, 'assets', 'loading.gif'), // Path to a custom loading GIF
      remoteReleases: 'http://localhost:80/update'        // URL for auto-updates
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
};

createInstaller();
