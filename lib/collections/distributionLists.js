DistributionList = new Mongo.Collection("distributionslist");

var Schemas = {};

Schemas.DistributionList = new SimpleSchema({
	agentUserId: {
		//this will reference users collection
		type: String,
		label: "UserId"
	},
	name: {
		type: String,
		label: "Name"
	},
	agentContacts: {
		//this will point to user collection which agent contacts are added.
		type: [Object],
		label: "Agent Contacts",
		optional: true
	},
	"agentContacts.$.uid": {
		type: String,
		label: "ContactUserId",
		optional: true
	},
	"agentContacts.$.name": {
		type: String,
		label: "ContactName",
		optional: true
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

DistributionList.attachSchema(Schemas.DistributionList);

validateDistributionAdd = function(profile) {
	var errors = {};

	if(!profile.name)
		errors.name = "Please fill in Name of DistributionList";

	return errors;
};

Meteor.methods({
	CreateDistribution: function(distributionAttributes) {

    	var user = Meteor.user();
    	if(!user)
        	throw new Meteor.Error(401, "You need to log in to register a Client!");
		
		DistributionList.insert(distributionAttributes);
	},

	deleteDistribution: function(distribution_id) {
		var user = Meteor.user();
    	if(!user)
        	throw new Meteor.Error(401, "You need to log in to register a Client!");
		DistributionList.remove(distribution_id);
	},
});

/*DistributionLists = new Mongo.Collection("distributionLists");

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
*/
/*Meteor.methods({
	dealInsert: function(dealAttributes) {

	},
});*/