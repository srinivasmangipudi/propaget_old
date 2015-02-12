Template.dashboard.created = function() {
	console.log("dashboard created");
	console.log(this.data);
};

Template.dashboard.rendered = function() {
    //console.log(this.data);
    //var controller = Router.current();
    //console.log(controller.params.tagName);
};

Template.dashboard.helpers({
	user: function() {
		console.log("user helper");
		console.log(this.user);
		return this.user ? this.user : null;
	}
});