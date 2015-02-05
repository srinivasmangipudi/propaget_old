AgentContacts = new Mongo.Collection("agentContacts");

var Schemas = {};

Schemas.AgentContact = new SimpleSchema({
	userId: {
		//this will point to Meteor.Users() collection
		type: String,
		label: "UserId"
	},
	agentId: {
		//this will point to agents collection. If userId and agentId is null, then conact is not on our system
		type: String,
		label: "AgentId"
	},
	phone: {
		type: [Object]
	},
	"phone.$.type": {
		type: String,
		label: "Phone(s)"
	},
	"phone.$.number": {
		type: String,
	},
	email: {
		type: String,
		label: "Email",
		optional: true,
		max: 1000,
		regEx: SimpleSchema.RegEx.Email
	},
	offersSentCount: {
		type: Number,
		label: "OffersSentCount",
	},
	offersReceivedCount: {
		type: Number,
		label: "OffersReceivedCount",
	},
	dealsMadeCount: {
		type: Number,
		label: "DealsMadeCount",
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

AgentContacts.attachSchema(Schemas.AgentContact);

/*Meteor.methods({
	dealInsert: function(dealAttributes) {

	},
});*/