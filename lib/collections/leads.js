Leads = new Mongo.Collection("leads");

var Schemas = {};

Schemas.Lead = new SimpleSchema({
	userID: {
		//this will reference agents collection
		type: String,
		label: "userID"
	},
	clientId: {
		//this will point to clients collection
		type: String,
		label: "ClientId",
		optional: true,
	},
	clientEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
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

validateCreateLeadForm = function(leadData) {
	var errors = {};

	if(!leadData.title)
		errors.title = "Please fill in Title";
	if(!leadData.propertyInfo)
		errors.propertyInfo = "Please fill in Property Information";
	if(!leadData.category)
		errors.category = "Please fill in Category";
	if(!leadData.type)
		errors.type = "Please fill in Type";
	if(!leadData.clientEmail)
		errors.clientEmail = "Please fill in email address of client";

	return errors;
};


Meteor.methods({
	CreateLead: function(leadAttributes) {
		/*check(leadAttributes, {
        title: String,
        userId: String
    });*/
    var user = Meteor.user();
    if(!user)
        throw new Meteor.Error(401, "You need to log in to register a Client!");

		Leads.insert(leadAttributes);
    Meteor.call('sendGCMNotification', 'leadAdded', [1,2,3]);
	},

	UpdateLead: function(leadAttributes, lead_id) {
		/*check(leadAttributes, {
        title: String,
        userId: String
    });*/
	console.log('Update ========', leadAttributes);
    var user = Meteor.user();
    if(!user)
        throw new Meteor.Error(401, "You need to log in to register a Client!");
		Leads.update(lead_id, {$set: leadAttributes});
    Meteor.call('sendGCMNotification', 'leadUpdated', [1,2,3]);
	},
	deleteLead: function(lead_id) {
		var user = Meteor.user();
    if(!user)
        throw new Meteor.Error(401, "You need to log in to register a Client!");
		Leads.remove(lead_id);
	},
});