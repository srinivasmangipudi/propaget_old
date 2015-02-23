UI.registerHelper('profilePhotoSmall', function() {
	var user = Meteor.users.findOne(Meteor.userId());
	//console.log(user);
	if(user && user.services && user.services.facebook)
		return "http://graph.facebook.com/" + user.services.facebook.id + "/picture";
	else if(user && user.services && user.services.twitter)
		return user.services.twitter.profile_image_url;
	else if(user && user.services && user.services.google)
		return user.services.google.picture;
	else
		return "/images/default_user.png";
});

UI.registerHelper('profilePhotoLarge', function() {
	var user = Meteor.users.findOne(Meteor.userId());
	//console.log(user);
	if(user && user.services && user.services.facebook)
		return "http://graph.facebook.com/" + user.services.facebook.id + "/picture?&type=square&width=200&height=200";
	else if(user && user.services && user.services.twitter)
		return user.services.twitter.profile_image_url;
	else if(user && user.services && user.services.google)
		return user.services.google.picture;
	else
		return "/images/default_user.png";
});

UI.registerHelper('userPhotoSmall', function(id) {
	var user = Meteor.users.findOne(id);
	//console.log(id);
	//console.log(user);
	if(user && user.services && user.services.facebook)
	{
		//console.log("http://graph.facebook.com/" + user.services.facebook.id + "/picture");
		return "http://graph.facebook.com/" + user.services.facebook.id + "/picture";
	}
	else if(user && user.services && user.services.twitter)
		return user.services.twitter.profile_image_url;
	else if(user && user.services && user.services.google)
		return user.services.google.picture;
	else
		return "/images/default_user.png";
});

UI.registerHelper('userPhotoLarge', function(id) {
	var user = Meteor.users.findOne(id);
	//console.log(id);
	//console.log(user);
	if(user && user.services && user.services.facebook)
	{
		//console.log("http://graph.facebook.com/" + user.services.facebook.id + "/picture");
		return "http://graph.facebook.com/" + user.services.facebook.id + "/picture?&type=square&width=200&height=200";
	}
	else if(user && user.services && user.services.twitter)
		return user.services.twitter.profile_image_url;
	else if(user && user.services && user.services.google)
		return user.services.google.picture;
	else
		return "/images/default_user.png";
});

UI.registerHelper('userName', function(id) {
	var user = Meteor.users.findOne(id);
	console.log(id);
	console.log(user);
	if(user && user.profile && user.profile.name)
	{
		return user.profile.name;
	}
	else
		return user.username;
});
