Router.configure({
	trackPageView: true,
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	'clearErrors': function(page) {
		Errors.clearSeen();
		return page;
	},
	waitOn: function() {
		
	}
});

Router.route('/', {
	name: 'home',
	data: function() {
		return 'hello hello!!';
	}
});

var requireLogin = function() {
	if (!Meteor.user()){
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
};

//Router.onBeforeAction(requireLogin, {only: 'dilemmaSubmit'});
//Router.onBeforeAction('dataNotFound', {only: ['dilemmaPage', 'dilemmaEdit', 'dilemmaUser']});
Router.onAfterAction(function() {
        document.title = 'Propaget';
      }
);
