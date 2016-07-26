# IDEO-London-Slackbot
The First Slackbot on our Design Team here in London

We've been developing semi autonomous helpers for our Design Teams here at IDEO. This is London's first bot on the design team. Read more about the project here on IDEO Labs: https://labs.ideo.com

## How to install / setup your bot

These steps are very specifically for anyone wanting to use Zendrive as a trigger, and Parse as the message formatter. (There are probably smarter ways to do this, and originally we had other things triggered and stored in Parse, but the steps below are the bare essentials)

1. You'll need a Zendrive account and a working fleet of drivers recording trips. See the Zendrive site on how to get this running: https://www.zendrive.com/
2. You'll need a Parse installation, this means getting a copy of Parse Server installed somewhere - i'd recommend Heroku: https://devcenter.heroku.com/articles/deploying-a-parse-server-to-heroku
3. Figure out your Parse Application's incoming Webhook (see extra steps below), enter the webhook into you Zendrive Settings page: https://www.zendrive.com/developers/settings/advanced
4. Add the code in the main.js file to your Parse 'cloud' folder. If you haven't got any other code in the existing `main.js` file you can over write `main.js` with the one in this repo
5. Edit the `main.js` file to include your Slack incoming webhook link (see extra steps below)
6. That's it. you can test it by pasting the snippet below into your terminal window - make sure you replace the application ID and Key with your own from Parse

## Testing Snippet
Note the missing Application ID and API Key in the string, replace this with yours found in your Parse App Settings

    
    curl -X POST -H "X-Parse-Application-Id: [ADDYOURID]" -H "X-Parse-REST-API-Key: [ADDYOURKEY]" -H "Content-Type: application/json" -d "{\"version\":1,\"type\":\"TRIP_SCORED\",\"driver_id\":\"trip_driver\",\"trip_id\": 1456726828778 }" https://api.parse.com/1/functions/zendrive_webhook
    

### Defining your Parse Incoming Webhook address
1. In your Parse Dashboad go to the App Settings page
2. Go to Securty & Keys
3. Note your Application ID and your JavaScript Key (Keep these safe, they let anyone manpiulate your app!)
4. Your incoming link will be: `https://APPLICATION_ID:javascript-key=JAVASCRIPT_KEY@api.parse.com/1/functions/zendrive_webhook`
5. Pase this into your Zendrive Dashboard Advanced page 'Notifications Webhooks' box

### Defining your Slack Incoming Webhook address
Note that you'll probably need to be the admin and be on a paid Slack plan to do some of this.
1. Create a new Channel in Slack where your messages will appear
1. Go to your Slack group in a browser, go to the Apps and Integrations page 
2. Click the Build button, then choose 'Something just for my team'
3. Select Incoming WebHooks
4. Set it to the channel you created in step 1
5. Copy the Webhook URL from the text box
6. Paste the URL into the `main.js` file