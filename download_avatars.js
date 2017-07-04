var request = require('request');

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
   //  console.log (requestURL)



getRepoContributors("jquery", "jquery", (data) => {
  data.forEach((contributor) => {
    console.log(contributor.avatar_url);
  });
});
  // console.log("Errors:", err);
  // console.log("Result:", result);








  // var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  //   console.log (requestURL)

  // request.get(requesURL)
// function getRepoContributors(repoOwner, repoName, cb) {
//   const path = `/repos/${repoOwner}/${repoName}/contributors`;
//   request(options(path), function (err, response, body) {
//     console.log(body)
// })

// }

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
//   });

// 'https://avatars0.githubusercontent.com/u/192451?v=3'