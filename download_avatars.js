var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');


function options (path) {
  return {
    url: 'https://api.github.com' + path,
    headers: {
      'User-Agent': 'bunny'
    },
    qs: {
      access_token: process.env.GITHUB_TOKEN
    }
}};


function getRepoContributors(repoOwner, repoName, cb) {
  const path = `/repos/${repoOwner}/${repoName}/contributors`;
  request (options(path), function (error, response, body) {
    try {
      cb(JSON.parse(body));
    } catch (err) {
      console.log ("Errors: ", err);
    }
  })
};
   // var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
   // console.log (requestURL)

var repoName = process.argv[2];
var repoUser = process.argv[3];

getRepoContributors (repoName, repoUser, function (data) {
  if (repoName === undefined || repoUser === undefined) {
    console.log ('Please enter both a Repository Name and the Repository Owner\'s Username')
  } else {
      data.forEach(function (contributor) {
      var path = `./avatars/${contributor.login}.jpg`;
      downloadImageByURL(contributor.avatar_url, path);
      })
    };
});



function downloadImageByURL(url, filePath) {
request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on ('request', function (response) {
         console.log('Downloading image...')
       })
       .on('response', function (response) {
         console.log(' Response Status Message: ', response.statusMessage, '\n', 'Response Type: ', response.headers['content-type'])
       })
       .pipe(fs.createWriteStream(filePath))
       .on('finish', function() {
         console.log('Response stream complete.');
    });
}