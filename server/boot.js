console.log("configuring");
configureFacebook = function(config) {

    console.log("inside config");
    // first, remove configuration entry in case service is already configured
    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });

   ServiceConfiguration.configurations.insert({
        service: "facebook",
        appId: config.clientId,
        secret: config.secret
    });
};

// set the settings object with meteor --settings private/settings-local.json
var facebookConfig = Meteor.settings.facebook;
if(facebookConfig) {
    console.log('Got settings for facebook', facebookConfig);
    configureFacebook(facebookConfig);
}