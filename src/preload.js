
const pluginManager = require('./pluginManager');
const { ipcRenderer } = require('electron');

ipcRenderer.on('message', (event, message) => {
      console.log(message);
})

window.onload = () => {
      window.$ = window.jQuery = require('jquery');
      pluginManager.loadPlugins("./plugins");
      pluginManager.initialize();
}