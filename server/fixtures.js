if(Meteor.users.find().count() === 0)
{
	/*
	//create test users
	var userClientId = Meteor.users.insert({
		username: "TestClient",
		password: "123123",
		profile: {name: "TestUser Client"}
	});
	var userClient = Meteor.users.findOne(userClientId);

	Clients.insert({
		userId: userClientId,
		info: "hey this is my info"
	});
	var client = Clients.findOne();
	console.log("-- Client created --");
	console.log(client);

	var userAgentId = Meteor.users.insert({
		username: "TestAgent",
		password: "123123",
		profile: {name: "TestUser Agent"}
	});
	var userAgent = Meteor.users.findOne(userAgentId);

	Agents.insert({
		userId: userAgentId,
		experience: "This is the test agent",
		summary: "over all good ratings"
	});
	var agent = Agents.findOne({userId: userAgentId});
	console.log("-- Agent created --");
	console.log(agent);

	for(i=0; i<50; i++)
	{
		var z = i%2;

		Leads.insert({
			agentId: agent._id,
			clientId: client._id,
			title: "lead title #" + i,
			type: z===0 ? "Buy" : "Sell",
			category: z===0 ? "Lease" : "Sale",
			propertyInfo: "property info #" + i,
			handshake: z===0 ? true : false
		});
	}
	*/
}