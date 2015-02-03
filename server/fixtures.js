if(Deals.find().count() === 0)
{
	//create test user
	var testuserId = Meteor.users.insert({
		profile: {name: "TestUser"}
	});
	var testuser = Meteor.users.findOne(testuserId);

	Deals.insert({	title: "Test Deal 1",
					agentId: "need to create",
					clientId: "need to create",
					type: "sell",
					propertyInfo: "2 Bhk, no bathroom",
					handshake: false,
	});

	Deals.insert({	title: "Test Deal 2",
					agentId: "need to create",
					clientId: "need to create",
					type: "buy",
					propertyInfo: "3 Bhk, 3 bathrooms",
					handshake: false,
	});

	Deals.insert({	title: "Test Deal 3",
					agentId: "need to create",
					clientId: "need to create",
					type: "sell",
					propertyInfo: "4 Bhk, nice flat",
					handshake: false,
	});

	Deals.insert({	title: "Test Deal 4",
					agentId: "need to create",
					clientId: "need to create",
					type: "sell",
					propertyInfo: "Studio, no kitchen",
					handshake: false,
	});
	
	Deals.insert({	title: "Test Deal 5",
					agentId: "need to create",
					clientId: "need to create",
					type: "buy",
					propertyInfo: "9 Bhk, luxary villa",
					handshake: false,
	});

}