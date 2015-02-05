Deals = new Mongo.Collection("deals");

var Schemas = {};

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

/*Meteor.methods({
	dealInsert: function(dealAttributes) {

	},
});*/