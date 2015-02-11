Template.myProfile.created = function() {
};

Template.myProfile.rendered = function() {
    //console.log(this.data);
    //var controller = Router.current();
    //console.log(controller.params.tagName);
};

Template.myProfile.helpers({
	isAgentProfile:function() {
		var usertype = Session.get("usertype");
		//console.log(usertype);
		if(usertype === "Agent")
			return true;
		else 
			return false;
	},

	isClientProfile:function() {
		var usertype = Session.get("usertype");
		//console.log(usertype);
		if(usertype === "Client")
			return true;
		else 
			return false;
	},

});

Template.myProfile.events({
	'click .agentRadio': function(e) {
		//console.log("Show Agent registration form");
		Session.set("usertype", "Agent");
	},
	'click .clientRadio': function(e) {
		//console.log("Show Client registration form");
		Session.set("usertype", "Client");
	},

});