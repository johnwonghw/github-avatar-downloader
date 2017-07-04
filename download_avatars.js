var request = require('request');
var fs = require('fs')

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "johnwonghw";
var GITHUB_TOKEN = "90713039509b8029380ab7204e6c0d80566a59e9";

function options (path) {
  return {
    url: 'https://api.github.com' + path,
    headers: {
      'User-Agent': 'bunny'
    },
    qs: {
      access_token: process.env.GITHUB_TOKEN
    }
}}


function getRepoContributors(repoOwner, repoName, cb) {
  const path = `/repos/${repoOwner}/${repoName}/contributors`;
  request (options(path), function (error, response, body) {
    try {
      cb(JSON.parse(body));

    } catch (err) {
      console.log ("Errors: ", err)
    }

})};
   // var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
   // console.log (requestURL)


getRepoContributors (process.argv[2], process.argv[3], function (data) {
  data.forEach(function (contributor) {
  var path = `./avatars/${contributor.login}.jpg`;
  downloadImageByURL(contributor.avatar_url, path);
  });
});



function downloadImageByURL(url, filePath) {
request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on ('request', function (response) {
         console.log('Downloading image...')
       })
       .on('response', function (response) {                           // Note 3
         console.log(' Response Status Message: ', response.statusMessage, '\n', 'Response Type: ', response.headers['content-type'])
       })
       .pipe(fs.createWriteStream(filePath))
       .on('finish', function() {
         console.log('Response stream complete.');
    });            // Note 4
}



downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
