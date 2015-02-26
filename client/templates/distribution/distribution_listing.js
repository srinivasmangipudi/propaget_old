//distributionListing
Template.distributionListing.created = function() {
	Session.set('LoadingContacts', false);
};

Template.distributionListing.rendered = function() {
	if (Meteor.isCordova) {
		$('#adddistribution').show();
	}
};
//Create a local Mongo Collection
ContactsList = new Mongo.Collection("contactslist");

Template.distributionListing.events({
	"click #adddistribution": function() {
		console.log('in click of add dis');
		if (Meteor.isCordova) {
	        //console.log('in cordova called'+ContactsList.find().count());
	        if(ContactsList.find().count() == 0)
	        {
	          Session.set("LoadingContacts", true);
	          //code start for contact read and add to collection
	          var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name ,navigator.contacts.fieldType.nickname, navigator.contacts.fieldType.phoneNumbers,navigator.contacts.fieldType.emails ,navigator.contacts.fieldType.addresses];
	          navigator.contacts.find(fields, onSuccess, onError);

	          function onSuccess (contacts) {
	            //console.log('Found ' + contacts.length + ' contacts.');
	    
	            var cLength = contacts.length;

	            ///*formatting the data which is required
	            for (var i = 0; i < cLength; i++) {
	             	var dispName = 'Dummy name';
	              	dispName = contacts[i].displayName;
	              	if (dispName) {
		                
		                //ContactsList.insert({                  
		                ContactsList._collection.insert({
		                  createdAt: new Date(),
		                  agentUserId: Meteor.userId(),
		                  dispName: contacts[i].displayName,
		                  contactName: contacts[i].name,
		                  nickname: contacts[i].nickname,
		                  phoneNumbers: contacts[i].phoneNumbers,
		                  emails: contacts[i].emails,
		                  addresses: contacts[i].addresses
		                });
		                //console.log(JSON.stringify(contactData));
						//console.log('finish add single contact');
	              	}
	            }
	            Session.set("LoadingContacts", false);
	            //console.log('Full contact finish'+ContactsList.find().count());
	          }
	          function onError () {
	            console.log('Error found!');
	            Session.set("LoadingContacts", false);
	          }
	          
	        }
      	}
      	Router.go('/distributionsAdd');
	},
});



Template.distributionconfirmationModal.events({
 	'click .delete-item': function() {
 		deleteID = this.id;
 		Meteor.call('deleteDistribution', deleteID, function(error, result) {
 			if(error)
				return throwError(error.reason);
			 	$('#mydistributionModal-' + deleteID).modal('hide');
			 	Session.set('successMessage', "Deleted successfully");
		});
		
    return false;
	}
});