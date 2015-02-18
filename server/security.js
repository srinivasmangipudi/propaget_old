//this is based on ongoworks-security package- https://atmospherejs.com/ongoworks/security
//use this package for simple rules, but for custom rules write your own allow deny rules

// Any client may insert, update, or remove an agent if logged in
Agents.permit(['insert', 'update']).ifLoggedIn().apply();

// Any client may insert, update, or remove an client if logged in
Clients.permit(['insert', 'update']).ifLoggedIn().apply();

Leads.permit(['insert', 'update']).ifLoggedIn().apply();

