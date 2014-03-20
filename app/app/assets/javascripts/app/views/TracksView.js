var app = app || {}

app.TracksView = Backbone.View.extend({
    
    tagname: 'div',

    id: 'tracks',

    initialize: function(tracks_collection) {
	console.log("[TracksView] initialize")

	this._trackViews = [];

	this.collection = tracks_collection;

	_(this).bindAll('close') //garbage collection


	this.listenTo(this.collection, 'add', this.add_collection)
	this.listenTo(this.collection, 'remove', this.remove_collection)	
	this.listenTo(this.collection, 'render', this.render)

	this.listenTo(this.collection, 'render', this.lastTrackPageHandler)

	/*fetch initial batch*/
	this.page = 0
	this.fetch_next_page()

	var self = this;
    },

    /*fetches the next page (set of tracks)
     *and increments page counter
     */
    fetch_next_page : function() {
	console.log("[TracksView] fetch_next_page: " + this.page)
	var self = this;

	this.collection.fetch
	(
	    {
		data : {page: this.page},

		add: true,
		remove: false,

		success: function(collection, response, options) {
		    collection.trigger("render")
		    self.page += 1
		}
	    }
	)
    },

    /*lastTrackPageHandler: on fresh render event, handler
     *identifies the last track, and if in view
     *fetches the next set (page) of tracks
     */
    lastTrackPageHandler: function() {
	console.log("TracksView] lastTrackPageHandler")
	var self = this;
	$last = $('.track').last()

	/* we trigger only once, as "last" element
	 * will change  */
	$last.one('inview', function(e, isInView) {
	    if(isInView) {
		self.fetch_next_page()
	    }
	});
    },


    /* creates TrackView model and adds 
     * to internal _trackViews collection
     */ 
    add_collection : function(model) {
	console.log("[TracksView] add")
	var tv = new app.TrackView({ model : model } ) 
	this._trackViews.push(tv)
    },

    remove_collection : function(model) {
	console.log("[TracksView] remove")
	var tv_remove = _(this._trackViews).select(function(tv) { return tv.model === model; })[0];
	this._trackViews = _(this._trackViews).without(tv_remove);
	tv_remove.close()
    },

    render: function() {
	console.log("[TracksView] render")

	_(this._trackViews).each(function(tv) {
	    this.$el.append( tv.render().el )
	}, this);
    },


    close : function() {
	console.log("[TracksView] close")

	_(this._trackViews).each(function(tv) {
	    tv.close()
	});

	this._trackViews.length = 0
	this.collection.reset()

	this.remove()
	this.unbind()
    }

});
