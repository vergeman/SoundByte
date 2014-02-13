var app = app || {};

/* Track View */

app.TrackView = Backbone.View.extend({

    tagName: 'div',

    className: 'track',

    template: HandlebarsTemplates['tracks/show'],    

    events : {},

    render: function() {
	console.log("[TrackView] Render")
	this.$el.html( this.template({track : this.model.toJSON()} ));
	
	return this;
    },


})

