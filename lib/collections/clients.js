Clients = new Mongo.Collection("clients");

var Schemas = {};

Schemas.Client = new SimpleSchema({
	userId: {
		//this will reference Meteor users collection
		type: String,
		label: "UserId"
	},
	information: {
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
            throw new Meteor.Error(401, "You need to log in to register a Client!");
        
		Roles.addUsersToRoles(clientAttributes.userId, ["Client"], Roles.GLOBAL_GROUP);

		var clientId = Clients.insert(clientAttributes);

		//add the clientid on the user object - denormalized design for efficiency
		Meteor.users.update({_id: clientAttributes.userId}, {$set: {clientId: clientId}});
    },
});
