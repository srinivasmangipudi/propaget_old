Offers = new Mongo.Collection("offers");

var Schemas = {};

Schemas.Offer = new SimpleSchema({
	agentId: {
		//this will reference agents collection
		type: String,
		label: "AgentId"
	},
	clientId: {
		//this will point to clients collection
		type: String,
		label: "ClientId"
	},
	leadId: {
		//this will point to leads collection
		type: String,
		label: "LeadId"
	},
	title: {
		//some easy name
		type: String,
		label: "Title",
		max: 200
	},
	type: {
		//Buy or Sell
		type: String,
		label: "Type",
		allowedValues: ['Buy', 'Sell']
	},
	category: {
		//Lease, sale etc.
		type: String,
		label: "Category",
		allowedValues: ['Sale', 'Lease']
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

Offers.attachSchema(Schemas.Offer);

/*Meteor.methods({
	dealInsert: function(dealAttributes) {

	},
});*/