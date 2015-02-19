Template.createEditLead.created = function() {
	Session.set('LeadSubmitErrors', {});
};

Template.createEditLead.rendered = function() {
	/* Populate values for lead category and type on EDIT form */
  var type_value = $('#lead-type').attr('default-val');
  $('#lead-type option:contains(' + type_value + ')').attr('selected', 'selected')

  var category_value = $('#lead-category').attr('default-val');
  $('#lead-category option:contains(' + category_value + ')').attr('selected', 'selected')

	var value = $('#lead-handshake').attr('default-val');
	if(value) {
		$("#lead-handshake").attr("checked", true);
	}
}

Template.createEditLead.helpers({
	errorMessage: function(field) {
		return Session.get('LeadSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('LeadSubmitErrors')[field] ? 'has-error' : '';
	},
});

Template.createEditLead.events({
	'submit form': function(e) {
		e.preventDefault();

		var handshake = $('#lead-handshake').is(':checked') ? true : false;

		var LeadData = {
			'title' : $('#lead-title').val(),
			'propertyInfo' : $('#lead-propertyInfo').val(),
			'category' : $('#lead-category').val(),
			'type' : $('#lead-type').val(),
			'handshake' : handshake,
			'clientEmail' : $('#lead-clientEmail').val(),
			userID: Meteor.userId(),
		};

		var errors = validateCreateLeadForm(LeadData);

		if(!jQuery.isEmptyObject(errors)) 
			return Session.set('LeadSubmitErrors', errors);
		else
			Session.set('LeadSubmitErrors', {});
		
		/* Get lead id from URL params */
		var controller = Iron.controller();;
    var params = controller.getParams();
    
    if(params.id !=undefined) {
    	lead_id = params.id;
    	/* Update lead data */
			Meteor.call('UpdateLead', LeadData, lead_id,  function(error, result)	{
				if(error)
					return throwError(error.reason);
			});
			Session.set('successMessage', 'Lead updated successfully');
    }
    else {
    	/* Create new lead */
			Meteor.call('CreateLead', LeadData, function(error, result) {
				if(error)
					return throwError(error.reason);
				$('#create-lead-wrapper').hide();
				$('#closeCreatelead').hide();
				clearFeildValues();
			});

			/* Check if client is registered with the email id if not then create user */
			Meteor.call('CheckUserExistsByEmail', LeadData.clientEmail, function(error, userObj) {
				if(error)
					return throwError(error.reason);

				/* Send email notification to client for new lead is created */
				if(userObj) {
					templateName = "EmailNotification";
					
					emailData ={
						userObj: userObj,
						leadTitle : $('#lead-title').val()
					};

					/* Pass parameter to template and fetch whole html data */
					var html= Blaze.toHTML(Blaze.With(emailData, function() { return Template.EmailNotification; })); 

					var emailObj = {
						to : LeadData.clientEmail,
						from: 'komal.savla@focalworks.in',
						subject: 'New lead is created',
						body: html,
					};

					Meteor.call('sendEmailNotification', emailObj, function(error, userObj) {
						
					});
				}else {
					/* Create new client user */
					Meteor.call('CreateClientUser', LeadData.clientEmail, function(error, userObj) {
						if(error)
							return throwError(error.reason);
					});
				}
			});

    }
		
	},
});

/* Helper function to clear all fields value of create form */
function clearFeildValues() {
	$('#lead-title').val('');
	$('#lead-propertyInfo').val('');
 	$('#lead-category').val('');
 	$('#lead-type').val('');
}