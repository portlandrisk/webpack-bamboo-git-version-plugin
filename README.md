Create a file including any of;
- latest commit id (commitId)
- bamboo build number (bambooBuildNumber)
- build date (currentTime)

The file is created using an [EJS](https://www.google.com.au/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjPl9_9nrrMAhVBGKYKHUYJBukQFggcMAA&url=http%3A%2F%2Fwww.embeddedjs.com%2F&usg=AFQjCNF_ieYgBG-cojHuZHCejoJlP-M50g) template which can be provided as either a file or string.

**Example configuration**

webpack config;
```
config.output = {
  path: __dirname + '/dist'
},

config.plugins = [
   new WebpackBambooGitVersionPlugin({
                   outputFile: config.output.path + '/version.json',
                   template: './version.ejs'
               })
]
```

Where version.ejs in your project contains;
```
{
    "buildDate": "<%= currentTime %>",
    "currentCommitId": "<%= commitId %>",
    "bambooBuild": "<%= bambooBuildNumber %>"
}
```

The result file (/dist/version.json) will contain something similar to;
```
{
  "buildDate": "Fri Apr 29 2016 16:29:52 GMT+1000 (AEST)",
  "currentCommitId": "a4e7ff1d6783b7fa894d098cbeeb9d404d71d5d1",
  "bambooBuild": "123"
}
```