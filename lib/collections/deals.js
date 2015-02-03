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
	},
	updatedAt: {
		type: Date,
		label: "Updated Date",
	},
});

Deals.attachSchema(Schemas.Deal);

Meteor.methods({
	dealInsert: function(dealAttributes) {
		
	},
});