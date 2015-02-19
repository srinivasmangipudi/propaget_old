Meteor.startup(function() {
	smtp = {
    username: '',   // eg: server@gentlenode.com
    password: '',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

// In your server code: define a method that the client can call
Meteor.methods({
  sendEmailNotification: function (emailData) {

    check([emailData.to, emailData.from, emailData.subject, emailData.body], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: emailData.to,
      from: emailData.from,
      subject: emailData.subject,
      text: emailData.body
    });
  }
});