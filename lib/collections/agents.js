Agents = new Mongo.Collection("agents");

var Schemas = {};

Schemas.Agent = new SimpleSchema({
	userId: {
		//this will point to Meteor.Users() collection
		type: String,
		label: "UserId"
	},
	experience: {
		type: String,
		label: "Experience",
		optional: true,
		max: 1000
	},
	summary: {
		type: String,
		label: "Summary",
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

Agents.attachSchema(Schemas.Agent);

validateAgentProfile = function(profile) {
	var errors = {};

	if(!profile.experience)
		errors.experience = "Please fill in your experience";
	if(!profile.summary)
		errors.summary = "Please fill in a summary";
	if(!profile.userId)
		errors.userId = "User not logged in!";

	return errors;
};

Meteor.methods({
	agentProfileCreate: function(agentAttributes) {
        check(agentAttributes, {
            experience: String,
            summary: String,
            userId: String
        });

        var user = Meteor.user();
        if(!user)
            throw new Meteor.Error(401, "You need to log in to register a new Agent!");
        
		Roles.addUsersToRoles(agentAttributes.userId, ["Agent"], Roles.GLOBAL_GROUP);

		var agentId = Agents.insert(agentAttributes);

		//add the agentId on the user object - denormalized design for efficiency
		Meteor.users.update({_id: agentAttributes.userId}, {$set: {agentId: agentId}});

    },
});