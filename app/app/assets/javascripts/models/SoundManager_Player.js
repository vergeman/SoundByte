var app = app || {}

app.SoundManager_Player = Backbone.Model.extend({


    initialize: function() {
	this._player =  null;
	this._sound=null;
	this._ready = null;
	this._track_id = null;
	this._timestamp=null;
	this._init_player();
    },

    _init_player : function() 
    {
	var self = this;

	soundManager.setup({
	    url: '/swf',
	    flashVersion: 9,
	    preferFlash: false,
	    debugMode: true,
	    onready: function() {
		self._ready = true;
		if (self._track_id || self.timestamp) {
		    //if track_id/timetstamp are null, we haven't called play yet, so don't load
		    //if they are populated, we've calleed play, but sm wasn't ready at the time.  now it is so load.
		    self._load(self._track_id, self._timestamp)
		}
	    },
	    ontimeout: function() {},
	    
	});
	console.log("init_player")
    },
    _load : function(track_id, timestamp) 
    {
	var soundcloud_key = $('#soundcloud_key').attr('data');
	var self = this;
        this._sound = soundManager.createSound({
            id: '_sound',
            url: 'http://api.soundcloud.com/tracks/' + track_id + '/stream?client_id=' + soundcloud_key,
	    stream: true,
	    autoLoad: true,
	    onload: function() {
		console.log("onload")
		self._sound.play({position: timestamp})
	    }
        })

    },
    getElapsed : function() {
	if (!this._sound || !this._sound.position) {
	    return 0;
	}
	return this._sound.position
    },
    play : function(track_id, timestamp) {
	console.log("[SoundManager] play")
	
	if (this._ready) {
            this._load(track_id, timestamp)
	}
	this._track_id = track_id
	this._timestamp = timestamp

    },
    resume: function() {},
    pause: function() {},
    seek : function(time) {
	//msec offset
	this._sound.setPosition(time)
    },
    stop : function()
    {
	console.log("[Soundmanager] stop")
	this._sound.stop();
	this.unload();
    },
    unload : function() 
    {
	console.log("[Soundmanager] destruct")
	this._sound.destruct()
    }
});
