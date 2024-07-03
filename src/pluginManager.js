const fs= require('fs');
const path= require('path');


class PluginManager {
    constructor() {
        this.plugins = [];
    }

    registerPlugin(plugin) {
        this.plugins.push(plugin);
    }

    initialize() {
        this.plugins.forEach((plugin) => {
            plugin();
        });
    }

    loadPlugins(folderPath) {
        console.log();
        const pluginFiles = fs.readdirSync(path.join(__dirname, folderPath));

        pluginFiles.forEach((pluginFile) => {
            if (pluginFile.endsWith('.js')) {
                const plugin = require(folderPath + '/' + pluginFile);
                this.registerPlugin(plugin);
            }

        });
    }
};

module.exports = new PluginManager();