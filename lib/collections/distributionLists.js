DistributionLists = new Mongo.Collection("distributionLists");

var Schemas = {};

Schemas.DistributionList = new SimpleSchema({
	agentId: {
		//this will reference agents collection
		type: String,
		label: "AgentId"
	},
	name: {
		type: String,
		label: "Name"
	},
	agents: {
		//this will point to agents collection.
		type: [Object],
		label: "Agents"
	},
	"agents.$.name": {
		type: String,
		label: "AgentName"
	},
	"agents.$.id": {
		type: String,
		label: "AgentId"
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

DistributionLists.attachSchema(Schemas.DistributionList);

/*Meteor.methods({
	dealInsert: function(dealAttributes) {

	},
});*/