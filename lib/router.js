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

DealsListController = RouteController.extend({
	template: 'dealsList',
	increment: 5,
	fastRender: true,
	dealsLimit: function() {
		return parseInt(this.params.dealsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.dealsLimit()};
	},
	subscriptions: function() {
		//this.dealsSub = Meteor.subscribe('deals', this.findOptions());
		//this.userProfileSub = Meteor.subscribe('singleUser', this.myId());
	},
	deals: function() {
		//return Deals.find({}, this.findOptions());
	},
	myId: function() {
		var userId = Meteor.userId();

		if(!userId)
			{ userId = ''; }

		return userId;
	},
	user: function() {
		return Meteor.users.findOne(this.myId());
	},
	data: function() {
		//var hasMore = this.deals().count() === this.dealsLimit();
		var hasMore = null;
		return {
				user: this.user(),
				//deals: this.deals(),
				//ready: this.dilemmasSub.ready && this.userProfileSub.ready,
				nextPath: hasMore ? this.nextPath() : null
			};
	}
});

NewDealsController = DealsListController.extend({
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newDeals.path({dealsLimit: this.dealsLimit() + this.increment});
	}
});

BestDealsController = DealsListController.extend({
	sort: {votes: -1, submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.bestDeals.path({dealsLimit: this.dealsLimit() + this.increment});
	}
});

Router.route('/', {
	name: 'home',
	controller: NewDealsController
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
