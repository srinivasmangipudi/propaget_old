Meteor.methods({
 CreateClientUser: function(email) {
    /* Extract Username from email address */
    var nameMatch = email.match(/^([^@]*)@/);
    var username = nameMatch[1];
    var username = username.replace('.', '');

    /* Created user programatically */
    var userId = Accounts.createUser({
        username: username,
        email : email,
        password : 'test12345',
        profile  : {
        }
    });

    /* Add role Client to user */
    Roles.addUsersToRoles(userId, ['Client'], Roles.GLOBAL_GROUP);
    Accounts.sendVerificationEmail(userId);
    return username;
  },
});