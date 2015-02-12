Template.dashboard.created = function() {
	console.log("dashboard created");
	console.log(this.data);

	/*if(this.user && this.user.usertype)
		Session.set('usertype', this.user.usertype);*/
};

Template.dashboard.rendered = function() {
    //console.log(this.data);
    //var controller = Router.current();
    //console.log(controller.params.tagName);
};

Template.dashboard.helpers({
	/*usertype: function() {
		if(this.ready && this.user && this.user.usertype)
			return this.user.usertype;
		else if(this.ready && !this.user.usertype)
		{
			return null;
			//Router.go('myProfile', {user: this.user});
		}
	},*/
	user: function() {
		console.log("user helper");
		console.log(this.user);
		return this.user ? this.user : null;
	}
});