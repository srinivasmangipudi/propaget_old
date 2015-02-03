Meteor.publish("directory", function (id) {
  return Meteor.users.find({_id:id}, {fields: { emails: 1,
												profile: 1,
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
												"services.facebook.id": 1,
												"services.facebook.email": 1,
												"services.twitter.screenName": 1,
												"services.twitter.profile_image_url": 1,
												"services.google.email": 1,
												"services.google.picture": 1}});
});

Meteor.publish('deals', function(options) {
	check(options, {
		sort: Object,
		limit: Number
	});
	return Deals.find({}, options);
});

Meteor.publish('singleDeal', function(id) {
	check(id, String);
	return Deal.find(id);
});