'use strict';
const http = require('https');
exports.appWebhook = (req, res) => {
 let content = req.body.result.parameters['content'];
 getContent(content).then((output) => {
   res.setHeader('Content-Type', 'application/json');
   res.send(JSON.stringify({ 'speech': output, 'displayText': output    }));
 }).catch((error) => {
   // If there is an error let the user know
   res.setHeader('Content-Type', 'application/json');
   res.send(JSON.stringify({ 'speech': error, 'displayText': error     }));
 });
};
function getSubreddit (content) {
 if (content == "funny" || content == "joke" || content == "laugh")
   return {sub: "jokes", displayText: "joke"};
   else {
     return {sub: "todayILearned", displayText: "fact"};
   }
}
function getContent (content) {
 let subReddit = getSubreddit(content);
 return new Promise((resolve, reject) => {
   console.log('API Request: to Reddit');
   http.get(`https://www.reddit.com/r/${subReddit["sub"]}/top.json?sort=top&t=day`, (resp) => {
     let data = '';
     resp.on('data', (chunk) => {
       data += chunk;
     });
     resp.on('end', () => {
       let response = JSON.parse(data);
       let thread = response["data"]["children"][(Math.floor((Math.random() * 24) + 1))]["data"];
       let output = `Here's a ${subReddit["displayText"]}: ${thread["title"]}`;
       if (subReddit['sub'] == "jokes") {
         output += " " + thread["selftext"];
       }
       output += "\nWhat do you want to hear next, a joke or a fact?"
       console.log(output);
       resolve(output);
     });
   }).on("error", (err) => {
     console.log("Error: " + err.message);
     reject(error);
   });
 });
}