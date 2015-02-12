//router configuration
Router.configure({
	trackPageView: true,
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	'clearErrors': function(page) {
		Errors.clearSeen();
		return page;
	},
	/*waitOn: function() {
		if(Meteor.userId())
		{
			Meteor.subscribe('singleUser', Meteor.userId());	
		}
	},*/
	/*onBeforeAction: function() {
		if (!(Meteor.loggingIn() || Meteor.user())) 
		{
			this.render('landingPage');

		}
		else
		{
			this.next();
		}
	}*/
});

//Base controller for dashboard
DashboardController = RouteController.extend({
	template: 'dashboard',
	waitOn: function() {
		this.userProfileSub = Meteor.subscribe('singleUser', this.myId());
		return [this.userProfileSub];
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
		var user = this.user();

		if(user)
		{
			console.log("found user on router");

			//return the correct data depending on client or agent
			return {
				user: this.user(),
				ready: this.userProfileSub,
			};			
		}
	}
});

Router.route('/', {
	name: 'home',
	controller: DashboardController
});

Router.route('/myprofile', {
	name: 'myProfile'
});

//Base controller for leads. New/Big leads etc, can extend from this base controller below.
LeadsListController = RouteController.extend({
	template: 'leadsList',
	increment: 5,
	fastRender: true,
	leadsLimit: function() {
		return parseInt(this.params.leadsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.leadsLimit()};
	},
	subscriptions: function() {
		this.userProfileSub = Meteor.subscribe('singleUser', this.myId());
		this.agentSub = Meteor.subscribe('singleAgentByUserId', this.myId());
		this.leadsSub = Meteor.subscribe('leads', this.agentId(), this.findOptions());
	},
	leads: function() {
		return Leads.find({}, this.findOptions());
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
	agent: function() {
		return Agents.findOne({userId: this.myId()});
	},
	agentId: function() {
		var agent = this.agent();

		if(agent)
			return agent._id;
		else
			return '';
	},
	data: function() {
		var hasMore = this.leads().count() === this.leadsLimit();

		return {
				user: this.user(),
				agent: this.agent(),
				leads: this.leads(),
				ready: this.userProfileSub.ready && this.agentSub.ready && this.leadsSub.ready,
				nextPath: hasMore ? this.nextPath() : null
			};
	}
});

NewLeadsController = LeadsListController.extend({
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newLeads.path({leadsLimit: this.leadsLimit() + this.increment});
	}
});

BestLeadsController = LeadsListController.extend({
	sort: {votes: -1, submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.bestLeads.path({leadsLimit: this.leadsLimit() + this.increment});
	}
});

/*Router.route('/', {
	name: 'home',
	controller: NewLeadsController
});*/

Router.route('/newLeads/:leadsLimit?', {name: "newLeads"});

Router.route('/bestLeads/:leadsLimit?', {name: "bestLeads"});


//Base controller for deals. New/Big deals etc, can extend from this based controller below.
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
		this.dealsSub = Meteor.subscribe('deals', this.findOptions());
		this.userProfileSub = Meteor.subscribe('singleUser', this.myId());
	},
	deals: function() {
		return Deals.find({}, this.findOptions());
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
		var hasMore = this.deals().count() === this.dealsLimit();

		return {
				user: this.user(),
				deals: this.deals(),
				ready: this.dealsSub.ready && this.userProfileSub.ready,
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

Router.route('/new/:dealsLimit?', {name: "newDeals"});

Router.route('/best/:dealsLimit?', {name: "bestDeals"});

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
/*Router.onBeforeAction(function(pause) {
	if (!(Meteor.loggingIn() || Meteor.user())) {
          //Notify.setError(__('Please login.'));
          this.render('landingPage');
          //pause();
	}
});*/

Router.onAfterAction(function() {
        document.title = 'Propaget';
      }
);
