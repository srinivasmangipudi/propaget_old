Leads = new Mongo.Collection("leads");

var Schemas = {};

Schemas.Lead = new SimpleSchema({
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
	title: {
		//some easy name
		type: String,
		label: "Title",
		max: 200
	},
	propertyInfo: {
		type: String,
		label: "Property Information",
		optional: true,
		max: 1000
	},
	category: {
		//Lease, sale etc.
		type: String,
		label: "Category",
		allowedValues: ['Sale', 'Lease'],
	},
	type: {
		//Buy or Sell
		type: String,
		label: "Type",
		allowedValues: ['Buy', 'Sell'],
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

Leads.attachSchema(Schemas.Lead);

/*Meteor.methods({
	dealInsert: function(dealAttributes) {

	},
});*/