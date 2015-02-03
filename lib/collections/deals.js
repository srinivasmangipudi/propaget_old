Deals = new Mongo.Collection("deals");

var Schemas = {};

Schemas.Deal = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 200
	},
	agentId: {
		//this will reference agents collection
		type: String,
		label: "AgentId"
	},
	clientId: {
		//this will point to Meteor.Users() collection
		type: String,
		label: "ClientId"
	},
	type: {
		//Buy or Sell
		type: String,
		label: "Type"
	},
	propertyInfo: {
		type: String,
		label: "Property Information",
		optional: true,
		max: 1000
	},
	handshake: {
		type: Boolean,
		label: "Handshake",
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

Deals.attachSchema(Schemas.Deal);

/*Meteor.methods({
	dealInsert: function(dealAttributes) {

	},
});*/