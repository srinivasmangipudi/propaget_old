/**
 * Created by Amitav Roy on 18/2/15.
 */

Meteor.methods({
  sendGCMNotification: function(event, userIds) {

    /*check if the event is of type string*/
    check([event], [String]);

    /*declarations*/
    var notificationTitle, notificationText = "";

    /*check the event in switch case*/
    switch (event) {

      case 'leadAdded':
        var title = 'A new Lead has been added';
        var blankObj;
        var notificationMessage = "A new lead has been added to the system. Click here to check."
        Push.send({ from: 'Test', title: title, text: notificationMessage, query: { } });
        break;

      case 'leadUpdated':
        var title = 'One of your lead has been updated';
        var blankObj;
        var notificationMessage = "A lead has been updated. Click here to view."
        Push.send({ from: 'Test', title: title, text: notificationMessage, query: { } });
        break

      default:
        return false;
    }
  },
  sendSMSNotification: function (toPhoneNum, smsMessage) {
    /* need to add the account details of twilio */
    var AccountSID = '';
    var AuthToken = '';
    var fromMobileNumber = '+13202458411';

    twilio = Twilio(AccountSID, AuthToken);
    twilio.sendSms({
      to:toPhoneNum, // Any number Twilio can deliver to
      from: fromMobileNumber, // A number you bought from Twilio and can use for outbound communication
      body: smsMessage // body of the SMS message
    }, function(err, responseData) { //this function is executed when a response is received from Twilio
      if (!err) {
        console.log(responseData.from);
        console.log(responseData.body);
      } else {
        console.log(err);
      }
    });
  }
});

/* this code is required for execution to work after secure is removed */
Push.allow({ send: function(userId, notification) { return true; } });