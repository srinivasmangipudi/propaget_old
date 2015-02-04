OfferChains = new Mongo.Collection("offersChains");

var Schemas = {};

Schemas.OfferChain = new SimpleSchema({
	offerId: {
		//this will reference agents collection
		type: String,
		label: "OfferId"
	},
	offerType: {
		//if a chain is made anytime between a offer of type sell and buy, means a deal is made
		type: String,
		label: "Type"
	},
	agentIdUp: {
		//this will point to parent agent
		type: String,
		label: "AgentIdUp"
	},
	agentIdDown: {
		//this will point to child agent
		type: String,
		label: "AgentIdDown"
	},
	commission: {
		//either percentage or number value
		type: String,
		label: "Commission"
	},
	handshake: {
		//has the downstream agent confirmed
		type: Boolean,
		label: "Handshake",
	},
	status: {
		//If handshake false status=lead, else status=offer
		type: String,
		label: "Status"
	},
	isRoot: {
		//is this the root node?
		type: Boolean,
		label: "isRoot",
	},
	isLeaf: {
		//is this the leaf node? If yes then DealId should be filled
		type: Boolean,
		label: "isLeaf",
	},
	dealId: {
		//this will point to the deal collection
		type: String,
		label: "DealId"
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

OfferChains.attachSchema(Schemas.OfferChain);

/*Meteor.methods({
	dealInsert: function(dealAttributes) {

	},
});*/