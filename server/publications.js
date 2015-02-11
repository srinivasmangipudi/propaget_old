//Counts helper by tmeasday:publish-counts package
Meteor.publish('leadsCount', function(agentId) {
	check(agentId, String);
	Counts.publish(this, 'leadsCount', Leads.find({agentId: agentId}), { /*nonReactive: true*/ });
	return Posts.find({}, { limit: 10 });
});

Meteor.publish("directory", function (id) {
  return Meteor.users.find({_id:id}, {fields: { emails: 1,
												profile: 1,
												usertype: 1,
												"services.facebook.id": 1,
												"services.facebook.email": 1,
												"services.twitter.screenName": 1,
												"services.twitter.profile_image_url": 1,
												"services.google.email": 1,
												"services.google.picture": 1}});
});

Meteor.publish('singleUser', function(id) {
	check(id, String);
	return Meteor.users.find({_id:id}, {fields: { emails: 1,
												profile: 1,
												usertype: 1,
												"services.facebook.id": 1,
												"services.facebook.email": 1,
												"services.twitter.screenName": 1,
												"services.twitter.profile_image_url": 1,
												"services.google.email": 1,
												"services.google.picture": 1}});
});

//get single client by id
Meteor.publish('singleClient', function(id) {
	check(id, String);
	return Clients.find(id);
});

//get single client by userid
Meteor.publish('singleClientByUserId', function(userId) {
	check(userId, String);
	return Clients.find({userId: userId});
});

//get single agent by id
Meteor.publish('singleAgent', function(id) {
	check(id, String);
	return Agents.find(id);
});

//get single agent by userid
Meteor.publish('singleAgentByUserId', function(userId) {
	check(userId, String);
	return Agents.find({userId: userId});
});

//get single agentContact by id
Meteor.publish('singleAgentContact', function(id) {
	check(id, String);
	return AgentContacts.find(id);
});

//All agentContacts for an agent
Meteor.publish('agentContacts', function(agentId, options) {
	check(agentId, String);
	check(options, {
		sort: Object,
		limit: Number
	});

	return AgentContacts.find({agentId: agentId}, options);
});

//get single DistributionList by id
Meteor.publish('singleDistributionList', function(id) {
	check(id, String);
	return DistributionLists.find(id);
});

//All distributionLists for an agent
Meteor.publish('distributionLists', function(agentId, options) {
	check(agentId, String);
	check(options, {
		sort: Object,
		limit: Number
	});

	return DistributionLists.find({agentId: agentId}, options);
});

//get single lead by id
Meteor.publish('singleLead', function(id) {
	check(id, String);
	return Leads.find(id);
});

//All leads for an agent
Meteor.publish('leads', function(agentId, options) {
	check(agentId, String);
	check(options, {
		sort: Object,
		limit: Number
	});

	return Leads.find({agentId: agentId}, options);
});

//get single offer by id
Meteor.publish('singleOffer', function(id) {
	check(id, String);
	return Offer.find(id);
});

//All offers for an agent
Meteor.publish('offers', function(agentId, options) {
	check(agentId, String);
	check(options, {
		sort: Object,
		limit: Number
	});

	return Offers.find({agentId: agentId}, options);
});

//get single offerChain by id
Meteor.publish('singleOfferChain', function(id) {
	check(id, String);
	return OfferChains.find(id);
});

//All offerChains for an offer
Meteor.publish('offerChains', function(offerId, options) {
	check(offerId, String);
	check(options, {
		sort: Object,
		limit: Number
	});

	return Offers.find({offerId: offerId}, options);
});

//get single deal by id
Meteor.publish('singleDeal', function(id) {
	check(id, String);
	return Deal.find(id);
});

//All deals for an agent
Meteor.publish('deals', function(agentId, options) {
	check(agentId, String);
	check(options, {
		sort: Object,
		limit: Number
	});
	return Deals.find({agentId: agentId}, options);
});

