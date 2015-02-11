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
	{
		errors.user = "User not logged in!";
	}
	return errors;
};