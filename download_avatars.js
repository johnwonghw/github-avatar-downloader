var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "johnwonghw";
var GITHUB_TOKEN = "90713039509b8029380ab7204e6c0d80566a59e9";


function getRepoContributors(repoOwner, repoName, cb) {



  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
console.log (requestURL)

}

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });