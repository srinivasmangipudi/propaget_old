/*Accounts.onCreateUser(function(options, user) {
	
	console.log("onCreateUser --Hook");
	console.log("you can add any post user create customizations here!");

	//if username exists move on, else get name from social profile and insert username?

	
	console.log(user);
	console.log(options);
	//return user;
	if(!options || !user) {
        console.log('error creating user');
        return;
    } else {
        if(options.profile) {
            user.profile = options.profile;
        }
    }
    return user;
});*/