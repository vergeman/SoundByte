var app = app || {};


app.AppView = Backbone.View.extend({
    
    tagname: 'div',

    id: 'content',

    template: HandlebarsTemplates['tracks/index'],

    initialize: function(trackscollection) {
	console.log("[AppView] initialize")

	this.tracksView = new app.TracksView(trackscollection);

    },

    render: function() {
	
	//header
	this.$el.append(this.template() );

	//tracksView
	this.$el.append(this.tracksView.el)

	return this;
    },

});


