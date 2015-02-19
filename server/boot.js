console.log("->configuring external login services");
configureFacebook = function(config) {

    // first, remove configuration entry in case service is already configured
    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });

   ServiceConfiguration.configurations.insert({
        service: "facebook",
        appId: config.clientId,
        secret: config.secret
    });

    console.log("*Facebook configured!");

};

configureGoogle = function(config) {

    // first, remove configuration entry in case service is already configured
    ServiceConfiguration.configurations.remove({
        service: "google"
    });

   ServiceConfiguration.configurations.insert({
        service: "google",
        clientId: config.clientId,
        secret: config.secret
    });

    console.log("*Google configured!");

};

// set the settings object with meteor --settings private/settings-staging.json
var facebookConfig = Meteor.settings.facebook;
if(facebookConfig) {
    //console.log('Got settings for facebook', facebookConfig);
    configureFacebook(facebookConfig);
}

var googleConfig = Meteor.settings.google;
if(googleConfig) {
    //console.log('Got settings for Google', googleConfig);
    configureGoogle(googleConfig);
}