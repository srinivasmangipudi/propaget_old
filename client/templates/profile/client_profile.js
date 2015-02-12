Template.clientProfile.created = function() {
	Session.set('clientProfileSubmitErrors', {});

	var usertype = Session.get("usertype");
	console.log(usertype);
};

Template.clientProfile.rendered = function() {
};

Template.clientProfile.helpers({
	errorMessage: function(field) {
		return Session.get('clientProfileSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('clientProfileSubmitErrors')[field] ? 'has-error' : '';
	},
});

Template.clientProfile.events({
	'submit form': function(e) {
		e.preventDefault();

		var clientProfile = {
			information: $(e.target).find('[name=information]').val(),
			userId: Meteor.userId(),
		};

		console.log(clientProfile);

		var errors = validateClientProfile(clientProfile);
		if(errors.information || errors.userId)
			return Session.set('clientProfileSubmitErrors', errors);
		else
			Session.set('clientProfileSubmitErrors', {});

		console.log("All checks fine! Go save the profile >");

		Meteor.call('clientProfileCreate', clientProfile, function(error, result)
		{
			if(error)
				return throwError(error.reason);

			console.log("user role updated. Now create the client profile.");
		});
	}
});