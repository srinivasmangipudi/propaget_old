Template.dealsList.rendered = function() {
    //console.log(this.data);
    //var controller = Router.current();
    //console.log(controller.params.tagName);
};

Template.dealsList.helpers({
	dealsWithRank: function() {
		return this.deals.map(function(deal, index, cursor) {
			deal._rank = index;
			return deal;
		});
	},
});