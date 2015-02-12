Template.leadsList.rendered = function() {
    console.log(this.data);
    //var controller = Router.current();
    //console.log(controller.params.tagName);
};

Template.leadsList.helpers({
	leadsWithRank: function() {
		return this.leads.map(function(lead, index, cursor) {
			lead._rank = index;
			return lead;
		});
	},
});