
const pluginManager = require('./pluginManager');


window.onload = () => {
      window.$ = window.jQuery = require('jquery');
      pluginManager.loadPlugins("./plugins");
      pluginManager.initialize();
}