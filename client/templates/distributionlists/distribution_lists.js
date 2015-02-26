Template.distributionLists.created = function() {
};

Template.distributionLists.rendered = function() {
};

//Create a local Mongo Collection
//ContactsList = new Meteor.Collection(null);
ContactsList = new Meteor.Collection('contacts-list');

Template.distributionLists.events({
	"click .addToDistributionList": function(e) {
		console.log("inserting..");
		ContactsList._collection.insert({name:"row inserted"});
	},
});


Template.distributionLists.helpers({
	contactsListCount: function() {
		console.log(ContactsList._collection.find().count());
		return ContactsList._collection.find().count();
	}
});

