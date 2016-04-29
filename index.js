var fs = require('fs'),
    _ = require('underscore'),
    ejs = require('ejs'),
    childProcess = require('child_process');

function BambooGitVersionFile(options) {
    var self = this;

    var defaultOptions = {
        outputFile: './version.json',
        template: 'version.ejs',
        templateString: '',
        packageFile: './package.json',
        extras: {}
    };

    var optionsObject = options || {};
    optionsObject = _.defaults(optionsObject, defaultOptions);

    self.options = optionsObject || {};
    self.options['package'] = require(options.packageFile);
};

BambooGitVersionFile.prototype.apply = function(){
    var self = this;


    self.options.currentTime = new Date();

    self.options.buildVersion = childProcess.execSync('git rev-parse HEAD').toString();
    
    /*
     * If we are given a template string in the config, then use it directly.
     * But if we get a file path, fetch the content then use it.
     */
    if (self.options.templateString){
        self.writeFile(self.options.templateString);
    } else {
        fs.readFile(self.options.template, {encoding: 'utf8'}, function(error, content){

            if(error){
                throw error;
                return;
            }

            self.writeFile(content);
        });
    }
};

/**
 * Renders the template and writes the version file to the file system.
 * @param templateContent
 */
BambooGitVersionFile.prototype.writeFile = function(templateContent){
    var self = this;
    fileContent = ejs.render(templateContent, self.options);
    fs.writeFile(self.options.outputFile, fileContent, {flag: 'w'});
};

module.exports = BambooGitVersionFile;