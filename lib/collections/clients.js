Clients = new Mongo.Collection("clients");

var Schemas = {};

Schemas.Client = new SimpleSchema({
	userId: {
		//this will reference Meteor users collection
		type: String,
		label: "UserId"
	},
	info: {
		type: String,
		label: "Information",
		optional: true,
		max: 1000
	},
	createdAt: {
		type: Date,
		label: "Created Date",
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();
			}
		}
	},
	updatedAt: {
		type: Date,
		label: "Updated Date",
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
			denyInsert: true,
			optional: true
	},
});

Clients.attachSchema(Schemas.Client);

validateClientProfile = function(profile) {
	var errors = {};

	if(!profile.information)
		errors.information = "Please fill in your information";
	if(!profile.userId)
		errors.userId = "User not logged in!";

	return errors;
};

Meteor.methods({
	clientProfileCreate: function(clientAttributes) {
        check(clientAttributes, {
            information: String,
            userId: String
        });

        var user = Meteor.user();
        if(!user)
            throw new Meteor.Error(401, "You need to log in to post new dilemmas!");
        
		Roles.addUsersToRoles(clientAttributes.userId, ["Client"], Roles.GLOBAL_GROUP);
    },
    /*agentProfileCreate: function(agentAttributes) {
        check(agentAttributes, {
            usertype: String,
            experience: String,
            summary: String,
            userId: String
        });

        var user = Meteor.user();
        if(!user)
            throw new Meteor.Error(401, "You need to log in to post new dilemmas!");
        
        Meteor.users.update({_id: user._id}, {$set: {usertype: agentAttributes.usertype}}, function(error) {
        if(error) {
                //display the error to the user
                alert(error.reason);
            } else {
                console.log("User updated");
            }
        });
    },*/
});
