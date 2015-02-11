//Global schemas object to be accessed for autoforms. The collections are also defined here. 
//The schemas object could be later refactored as a local package and the schemas moved to individual files.

/*

// DECIDING TO NOT USE AUTOFORMS CURRENTLY BECAUSE OF UNDUE COMPLICATIONS
Schemas = {};

Clients = new Mongo.Collection("clients");

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


Agents = new Mongo.Collection("agents");

Schemas.Agent = new SimpleSchema({
	userId: {
		//this will point to Meteor.Users() collection
		type: String,
		label: "UserId",
		autoform: {
			omit: true
		}
	},
	experience: {
		type: String,
		label: "Experience",
		optional: true,
		max: 1000
	},
	summary: {
		type: String,
		label: "Summary",
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
		},
		autoform: {
			omit: true
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
		autoform: {
			omit: true
		},
		denyInsert: true,
		optional: true
	},
});

Agents.attachSchema(Schemas.Agent);


AgentContacts = new Mongo.Collection("agentContacts");

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


DistributionLists = new Mongo.Collection("distributionLists");

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


Leads = new Mongo.Collection("leads");

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



Deals = new Mongo.Collection("deals");

Schemas.Deal = new SimpleSchema({
	sellOfferId: {
		//this will reference offers collection
		type: String,
		label: "SellOfferId"
	},
	firstSellChainId: {
		//this will reference starting chain object
		type: String,
		label: "FirstSellChainId"
	},
	lastSellChainId: {
		//this will reference ending chain object
		type: String,
		label: "LastSellChainId"
	},
	buyOfferId: {
		//this will reference offer collection
		type: String,
		label: "BuyOfferId"
	},
	firstBuyChainId: {
		//this will reference starting chain object
		type: String,
		label: "FirstBuyChainId"
	},
	lastBuyChainId: {
		//this will reference ending chain object
		type: String,
		label: "LastBuyChainId"
	},
	status: {
		//(Prospect - default, confirmed, money paid etc)
		type: String,
		label: "Status",
		allowedValues: ['Prospect', 'MOU', "Finalised", "Paid"],
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


Offers = new Mongo.Collection("offers");

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


OfferChains = new Mongo.Collection("offersChains");

Schemas.OfferChain = new SimpleSchema({
	offerId: {
		//this will reference agents collection
		type: String,
		label: "OfferId"
	},
	offerType: {
		//if a chain is made anytime between a offer of type sell and buy, means a deal is made
		type: String,
		label: "Type",
		allowedValues: ["Sell", "Buy"]
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
	position: {
		//the position of this link in the tree
		type: Number,
		label: "Position"
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




Schemas.UserCountry = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        regEx: /^[A-Z]{2}$/
    }
});

Schemas.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    organization : {
        type: String,
        regEx: /^[a-z0-9A-z .]{3,30}$/,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
    country: {
        type: Schemas.UserCountry,
        optional: true
    }
});

Schemas.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    usertype: {
        //Identify if Agent or Client
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
        optional: true
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
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
    profile: {
        type: Schemas.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Note that when using this package, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schemas.User);

*/