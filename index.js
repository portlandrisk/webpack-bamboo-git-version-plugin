function BambooGitVersionPlugin(options) {
    // Setup the plugin instance with options...
}

BambooGitVersionPlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', function() {
        console.log('Hello World!');
    });
};

module.exports = BambooGitVersionPlugin;