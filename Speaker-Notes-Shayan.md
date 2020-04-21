Speaker Notes:


--
Introduction : 
 - A little about myself and my interests
 - motivation
 - Why workshops are important
 
--


Lab Section
--
Lets get started!

- Can everyone follow the link on the screen please:
**https://dialogflow.cloud.google.com/#/login**
- Sign in!
- Click on the <span style="color: blue"> Create Agent Button. </span> 

## Settings 

- DEFAULT LANGUAGE = **English - en**
- Default Time Zone = **(GMT -8:00) American/Los Angeles**


##  Lets get started
Lets go step by step on how to get started with the Bot.
- Choose Default Welcome Intent
  - Add User says
  - Add Test Response
- Create a custom entity
  - Define synonyms
  
## Attaching our new Entity to the Intent
 - Add training phrase : *Give me an interesting fact*
 - Add Responses : *Here's some $content*
 
 ## Test
 - Try out bot [Link on right side: Google Assistant]
 
 ## Add Webhook
 
 ```
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
```

## Using the gcloud Command-Line Tool
https://cloud.google.com/functions/docs/quickstart

## Deploy
Deploy our function using gcloud:
``` 
$ gcloud beta functions deploy appWebHook — stage-bucket BUCKET_NAME — trigger-http
```

**Note:** *To find the BUCKET_NAME, go to your Google project’s console and click on Cloud Storage under the Resources section. After you run the command, ***make note of the httpsTrigger*** URL mentioned. On the Dialoglow platform, find the “Fulfilment” tab on the sidebar.*

## Enable webhooks and paste in the URL
 - Visit the *say_content* Intent page.
 - Make the “content” parameter mandatory.
 - Notice a new section has been added to the bottom of the screen called “Fulfilment”. Enable the “Use webhook” checkbox.
 
## Adding Context to our Bot
*We want the user to be able to say, “More” or “Give me another one” and the bot to be able to understand what this means.*
- emit the context, scroll up on the “say-content” Intent’s page.
-  find the “Contexts” section.
- Let’s say for a count of 5. The count makes sure the bot remembers what the “content” is in the current conversation for up to 5 back and forths.
- Now, we want to create new content that can absorb this type of context and make sense of phrases like “More please”.
- To make it work the same way, we’ll make the Action and Fulfilment sections look the same way as the “say-content” Intent does.

## Integrations ***Web Demo***
Go to “Integrations” tab from the sidebar and enable “Web Demo” settings.

# And that’s a wrap! Your bot is ready
