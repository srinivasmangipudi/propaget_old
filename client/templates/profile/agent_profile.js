Template.agentProfile.created = function() {
	Session.set('agentProfileSubmitErrors', {});

	var usertype = Session.get("usertype");
	console.log(usertype);
};

Template.agentProfile.rendered = function() {
};

Template.agentProfile.helpers({
	errorMessage: function(field) {
		return Session.get('agentProfileSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('agentProfileSubmitErrors')[field] ? 'has-error' : '';
	},
});

Template.myProfile.events({
	'submit form': function(e) {
		e.preventDefault();

		var agentProfile = {
			experience: $(e.target).find('[name=experience]').val(),
			summary: $(e.target).find('[name=summary]').val(),
			userId: Meteor.userId()
		};

		console.log(agentProfile);

		var errors = validateAgentProfile(agentProfile);
		if(errors.experience || errors.summary || errors.user)
			return Session.set('agentProfileSubmitErrors', errors);
		else
			Session.set('agentProfileSubmitErrors', {});

		console.log("All checks fine! Go save the profile >");
	}
});