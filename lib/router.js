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
/*DashboardController = RouteController.extend({
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
});*/

DashboardController = RouteController.extend({
	template: 'dashboard',
	/*waitOn: function() {
		this.userProfileSub = Meteor.subscribe('singleUser', this.myId());
		return [this.userProfileSub];
	},*/	
	waitOn: function() {
		this.agentSub = Meteor.subscribe('singleAgentByUserId', this.myId());
		this.clientSub = Meteor.subscribe('singleClientByUserId', this.myId());
		this.userProfileSub = Meteor.subscribe('singleUser', this.myId());
		//this.userCompositeSub = Meteor.subscribe('clientCompositeDetails1', this.myId());
		return [this.clientSub, this.userProfileSub, this.agentSub];
	},
	/*waitOn: function() {
		return [
				Meteor.subscribe('singleUser', Meteor.userId()), 
				Meteor.subscribe('singleClientByUserId', Meteor.userId())];
	},
	loadingTemplate: "loading",
	action: function () {
    	this.render('dashboard');
	},*/
	/*waitOn: function() {
		this.userProfileSub = Meteor.subscribe('clientCompositeDetails1', this.myId());
		return [this.userProfileSub];
	},*/
	myId: function() {
		var userId = Meteor.userId();

		if(!userId)
			{ userId = ''; }

		return userId;
	},
	user: function() {
		return Meteor.users.findOne(this.myId());
	},
	isAgent: function() {
		if (Roles.userIsInRole(this.user(), 'Agent', Roles.GLOBAL_GROUP)) {
			return true;
		}
		else
			return false;
	},
	agent: function() {
		Agents.findOne({userId: Meteor.userId()});
	},
	client: function() {
		Clients.findOne({userId: this.myId()});
	},
	isClient: function() {
		if (Roles.userIsInRole(this.user(), 'Client', Roles.GLOBAL_GROUP)) {
			return true;
		}
		else
			return false;
	},
	action: function () {
		// this.ready() is true if all items returned from waitOn are ready
		console.log(this.ready());
		if (this.ready())
		{
			this.render();
		}
	},
	data: function() {
		var user = this.user();
		console.log("Router: isAgent->" + this.isAgent());
		console.log("Router: isClient->" + this.isClient());

		/*if(this.userProfileSub.ready && this.clientSub.ready && this.agentSub.ready)
		{
			return {
					user: this.user(),
					isAgent: this.isAgent(),
					isClient: this.isClient(),
					client: this.client(),
					//ready: this.userProfileSub && this.clientSub,
				};
		}*/

		if(user)
		{
			console.log("router: found user");

			if(this.isAgent())
			{
				console.log("router: identified agent");
				//return the correct data depending on client or agent
				return {
					user: this.user(),
					isAgent: this.isAgent(),
					isClient: this.isClient(),
					agent: this.agent(),
					ready: this.userProfileSub.ready && this.agentSub.ready,
				};

			}
			else if(this.isClient())
			{
				console.log("router: identified client");
				//return the correct data depending on client or agent
				return {
					user: this.user(),
					isAgent: this.isAgent(),
					isClient: this.isClient(),
					client: this.client(),
					ready: this.userProfileSub.ready && this.clientSub.ready,
				};
			}
			else
			{
				console.log("router: unregistered user");
				//return the user
				return {
					user: this.user(),
					ready: this.userProfileSub.ready,
				};							
			}			
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
//Router.onBeforeAction('loading');

Router.onAfterAction(function() {
        document.title = 'Propaget';
      }
);

/* === CODE FOR ROUTER (KOMAL) === */

LeadListingController = RouteController.extend({
	template: 'leadListing',
	waitOn: function() {
		console.log('in route lead list');
        return [Meteor.subscribe('leads', Meteor.userId())]
      },
	leads: function() {
		return Leads.find({userID: Meteor.userId()}, {sort: {createdAt: -1}, limit: Session.get('limit')});
	},
	all_leads: function() {
		return Leads.find({userID: Meteor.userId()}, {sort: {createdAt: -1}});
	},
	leadCount: function() {
		var totalCount = 0
		 totalCount = this.all_leads().count();
		return totalCount;
	},
	data: function() {
		return {
				leads: this.leads(),
				leadCount: this.leadCount(),
			};
	},

});

Router.route('/leadListing', {name: "leadListing", controller: 'LeadListingController'});


SingleLeadController = RouteController.extend({
	waitOn: function() {
        return [Meteor.subscribe('singleLead', this.params.id)]
      },
	lead: function() {
		return Leads.findOne({_id: this.params.id});
	},
	data: function() {
		return {
				lead: this.lead(),
				title: this.title(),
			};
	},

});

leadViewController = SingleLeadController.extend({
	template: 'leadItem',
	title: function() {
		return '';
	}
});

leadEditController = SingleLeadController.extend({
	template: 'createEditLead',
	title: function() {
		return 'Edit Lead';
	}
});

Router.route('/lead/:id', {name: "leadView", controller: 'leadViewController'});
Router.route('/lead/:id/edit', {name: "editView", controller: 'leadEditController'});


//Code for DistributionListing (Urmila)
DistributionListingController = RouteController.extend({
	template: 'distributionListing',
	waitOn: function() {
		//console.log('in route dis list');
        return [Meteor.subscribe('distributionslist', Meteor.userId())]
      },
	distributions: function() {
		return DistributionList.find({agentUserId: Meteor.userId()}, {sort: {createdAt: -1}, limit: Session.get('limit')});
	},
	all_distributions: function() {
		return DistributionList.find({agentUserId: Meteor.userId()}, {sort: {createdAt: -1}});
	},
	distributionsCount: function() {
		var totalCount = 0
		 totalCount = this.all_distributions().count();
		return totalCount;
	},
	data: function() {
		return {
				//distributions: this.distributions(),
				distributions: this.all_distributions(),
				distributionsCount: this.distributionsCount(),
			};
	},

});
Router.route('/distributionListing', {name: "distributionListing", controller: 'DistributionListingController'});

distributionsAddController = RouteController.extend({
	template : 'distributionsAdd',
	/*waitOn: function() {
		this.contactslist=ContactsList.find();
    },
    action: function () {
		// this.ready() is true if all items returned from waitOn are ready
		console.log(this.ready());
		if (this.ready())
		{
			this.render();
		}
	},
    /*contactslist :function ()
	{
		return ContactsList.find();
	},*/
	data: function ()
	{
		return null;
		/*return {
			contactslist: this.contactslist(),
		};*/
	}
});

Router.route('/distributionsAdd', {name: "distributionsAdd", controller: 'distributionsAddController'});

/* Clear Notification Message on on route change */
Router.onRun(function(pause) {
	Session.set('successMessage', '');
});
