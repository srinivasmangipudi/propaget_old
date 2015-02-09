var LEAD_HEIGHT = 80;
var Positions = new Meteor.Collection(null);

Template.leadItem.helpers({
	attributes: function() {
		var lead = _.extend({}, Positions.findOne({leadId: this._id}), this);
		var newPosition = lead._rank * LEAD_HEIGHT;
		var attributes = {};

		if(_.isUndefined(lead.position))
		{
			attributes.class = "lead invisible";
		}
		else
		{
			var delta = lead.position - newPosition;
			attributes.style = "top: " + delta + "px";

			if(delta === 0)
				attributes.class = "lead animate";
		}

		Meteor.setTimeout(function(){
			Positions.upsert({leadId: lead._id}, {$set: {position: newPosition}});
		});

		return attributes;
	}
});

Template.leadItem.events({
});