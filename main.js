Parse.Cloud.define("zendrive_webhook", function(request, response) {
    
    var driver = request.params.driver_id;
    var pushMessage = "";
    var messageArray = ["Oh look :eyes: , a new trip by",
                        ":newspaper: Good news, another trip logged by",
                        "if you're interested :mag: , we've just spotted another drive by",
                        "would you believe it :car: , a new drive by",
                        "Oh, a drive just got added to the database :computer:. It was by"];
    });
    
    /* Slack */
    Parse.Cloud.httpRequest({
        method: 'POST',
        url: 'ADD_YOUR_INCOMING_SLACK_URL_HERE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            'username': driver,
            'text': messageArray[Math.floor(Math.random() * 5)] + ' ' + driver + '. >View the trip on *Zendrive* by clicking <https://www.zendrive.com/dashboard/driver/' + driver + '| here>:world_map:.',
            'icon_emoji': ':car:'
        },
        success: function(httpResponse) {
            console.log(httpResponse.text);
            console.log("Trip Recorded - no notification sent");
          },
        error: function(httpResponse) {
            console.error('Request failed with response status ' + httpResponse.status);
            alert("Slack Error");
          }
    });
   
}); 