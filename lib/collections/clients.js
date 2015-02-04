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

/*Meteor.methods({
	dealInsert: function(dealAttributes) {

	},
});*/