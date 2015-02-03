var DEAL_HEIGHT = 80;
var Positions = new Meteor.Collection(null);

Template.dealItem.helpers({
	attributes: function() {
		var deal = _.extend({}, Positions.findOne({dealId: this._id}), this);
		var newPosition = deal._rank * DEAL_HEIGHT;
		var attributes = {};

		if(_.isUndefined(deal.position))
		{
			attributes.class = "deal invisible";
		}
		else
		{
			var delta = deal.position - newPosition;
			attributes.style = "top: " + delta + "px";

			if(delta === 0)
				attributes.class = "deal animate";
		}

		Meteor.setTimeout(function(){
			Positions.upsert({dealId: deal._id}, {$set: {position: newPosition}});
		});

		return attributes;
	}
});

Template.dealItem.events({
});