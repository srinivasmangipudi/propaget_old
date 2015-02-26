
Template.distributionsAdd.created = function() {
	Session.set('DistributionSubmitErrors', {});

};

Template.distributionsAdd.helpers({
	errorMessage: function(field) {
		return Session.get('DistributionSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('DistributionSubmitErrors')[field] ? 'has-error' : '';
	},
	contactslist: function ()
	{
		return ContactsList.find();
	},
	isLoading: function() {
		return Session.get('LoadingContacts');
	}
});


Template.distributionsAdd.events({
	'submit form': function(e) {
		e.preventDefault();
		var mycontact = [];
  		$('input[name=contact]:checked').each(function() {
    		mycontact.push({
    			name: $(this).val()});
  		});

		var DistributionData = {
			'name' : $('#distribution-name').val(),
			agentUserId: Meteor.userId(),
			agentContacts : mycontact
		};

		var errors = validateDistributionAdd(DistributionData);

		if(!jQuery.isEmptyObject(errors)) 
			return Session.set('DistributionSubmitErrors', errors);
		else
			Session.set('DistributionSubmitErrors', {});
		
    	/* Create new Distribution */
		Meteor.call('CreateDistribution', DistributionData, function(error, result) {
			if(error)
				return throwError(error.reason);
			clearFeildValues();
		});
    	Router.go('/distributionListing');
		
	},
});

/* Helper function to clear all fields value of create form */
function clearFeildValues() {
	$('#distribution-name').val('');
}