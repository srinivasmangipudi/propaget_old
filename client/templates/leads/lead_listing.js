Template.leadListing.created = function() {
	Session.setDefault('limit', 5);
};

Template.leadListing.rendered = function() {
};

Template.leadListing.events({
	"click #createlead": function() {
		$('#closeCreatelead').show();
		$('#create-lead-wrapper').slideDown('slow');
	},
	"click #closeCreatelead": function() {
		$('#closeCreatelead').hide();
		$('#create-lead-wrapper').slideUp('slow');
	},
	'click .give-me-more': function(evt) {
    incrementLimit();
  }, 
});

incrementLimit = function(inc) {
	if(!inc) {
		inc=5;
	}
	newLimit = Session.get('limit') + inc;
	Session.set('limit', newLimit);
	return newLimit;
}

Template.leadListing.helpers({
  morePost: function() {
  	limit = Session.get('limit');
  	totalCount = this.leadCount;
  	if(limit >= totalCount) {
  		return false;
  	}
    return true;
  }
});

Template.confirmationModal.events({
 'click .delete-item': function() {
 		deleteID = this.id;
 		Meteor.call('deleteLead', deleteID, function(error, result) {
 			if(error)
				return throwError(error.reason);
			 	$('#myModal-' + deleteID).modal('hide');
			 	Session.set('successMessage', "Deleted successfully");
		});
		
    return false;
	}
});