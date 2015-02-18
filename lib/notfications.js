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
  }
});

/* this code is required for execution to work after secure is removed */
Push.allow({ send: function(userId, notification) { return true; } });