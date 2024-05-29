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
};

module.exports = new PluginManager();