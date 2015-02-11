Template.myProfile.created = function() {
};

Template.myProfile.rendered = function() {
    //console.log(this.data);
    //var controller = Router.current();
    //console.log(controller.params.tagName);
};

Template.myProfile.events({
	'click .agentRadio': function(e) {
		console.log("Show Agent registration form");
	},
	'click .clientRadio': function(e) {
		console.log("Show Client registration form");
	},

});