var mkdirp = require('mkdirp'),
    getDirName = require('path').dirname,
    fs = require('fs'),
    _ = require('underscore'),
    ejs = require('ejs'),
    childProcess = require('child_process');

function BambooGitVersionFile(options) {
    var self = this;

    var defaultOptions = {
        outputFile: './version.json',
        template: './version.ejs',
        templateString: ''
    };

    var optionsObject = options || {};
    optionsObject = _.defaults(optionsObject, defaultOptions);

    self.options = optionsObject || {};
}

BambooGitVersionFile.prototype.apply = function () {
    var self = this;
    
    self.options.currentTime = new Date();

    var commitId = childProcess.execSync('git rev-parse HEAD');
    if (commitId) {
        self.options.commitId = commitId.toString().trim();
    }

    self.options.bambooBuildNumber = process.env.bamboo_buildNumber;

    /*
     * If we are given a template string in the config, then use it directly.
     * But if we get a file path, fetch the content then use it.
     */
    if (self.options.templateString) {
        self.writeFile(self.options.templateString);
    } else {
        fs.readFile(self.options.template, {encoding: 'utf8'}, function (error, content) {

            if (error) {
                throw error;
            }

            self.writeFile(content);
        });
    }
};

/**
 * Renders the template and writes the version file to the file system.
 * @param templateContent
 */
BambooGitVersionFile.prototype.writeFile = function (templateContent) {
    var self = this;
    var fileContent = ejs.render(templateContent, self.options);
    mkdirp(getDirName(self.options.outputFile), function(err) {
        fs.writeFile(self.options.outputFile, fileContent, {flag: 'w'});    
    });
};

module.exports = BambooGitVersionFile;