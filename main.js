Parse.Cloud.define("zendrive_webhook", function(request, response) {
    
    var driver = request.params.driver_id;
    var trip = request.params.trip_id;
    var tripString = '' + trip;
    var rando = Math.floor((Math.random() * 3) + 1);
    var pushMessage = "";
    var messageArray = ["Oh look :eyes: , a new trip by",
                        ":newspaper: Good news, another trip logged by",
                        "if you're interested :mag: , we've just spotted another drive by",
                        "would you believe it :car: , a new drive by",
                        "Oh, a drive just got added to the database :computer:. It was by"];
    
    console.log("Starting logger");
    var tripLogClass = Parse.Object.extend("tt");
    var tripLog = new tripLogClass();

    tripLog.set('tripID', tripString);
    tripLog.set('fromWebhook', true);

    tripLog.save(null, {
        success: function(atripLog) {
            console.log("Successfully saved a trip");
            response.success();
        },

        error: function(pointAward, error) {
            console.log("Could not save a trip " + error.message);
            response.error(error);
        }

    });
    
    /*Push*/ 
    var query = new Parse.Query(Parse.Installation);
    query.equalTo('username', driver);
     
    if (rando == 200 ) {

        Parse.Push.send({
            where: query,
            data: {
                alert: "Drive recorded, please complete a quick post drive survey",
                tripID: trip
          }
        }, { success: function() { 
            alert("Post trip notification sent to:" + driver + 'code:' + rando);
            push = "A push notification was sent";
          }, 
            error: function(error) { 
            alert("Could not send push " + error);
            }
        });
        
        pushMessage = "sent notification";
        
    };

    
    
    /* Slack */
    Parse.Cloud.httpRequest({
        method: 'POST',
        url: 'https://hooks.slack.com/services/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',
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