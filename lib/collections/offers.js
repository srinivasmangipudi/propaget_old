Offers = new Mongo.Collection("offers");

var Schemas = {};

Schemas.Offer = new SimpleSchema({
	title: {
		//some easy name
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
		//this will point to clients collection
		type: String,
		label: "ClientId"
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
		label: "Category"
	},
	type: {
		//Buy or Sell
		type: String,
		label: "Type"
	},
	handshake: {
		type: Boolean,
		label: "Handshake",
	},
	status: {
		//If handshake false status=lead, else status=offer
		type: String,
		label: "Status"
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