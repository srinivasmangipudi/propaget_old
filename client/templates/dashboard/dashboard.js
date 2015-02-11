Template.dashboard.created = function() {
	if(this.user && this.user.usertype)
		Session.set('usertype', this.user.usertype);
};

Template.dashboard.rendered = function() {
    console.log(this.data);
    //var controller = Router.current();
    //console.log(controller.params.tagName);
};

Template.dashboard.helpers({
	usertype: function() {
		if(this.user && this.user.usertype)
			return this.user.usertype;
		else
		{
			Router.go('myProfile', {user: this.user});
		}
	},
});