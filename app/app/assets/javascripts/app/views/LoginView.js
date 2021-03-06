
var app = app || {};

app.LoginView = Backbone.View.extend({

    tagName: 'div',
    id: 'content',

    template: JST['users/sign_in'],

    events : {
	'click input[type=submit]' : 'submit',
	'click #sign-up-link' : 'signup'
    },

    initialize: function(session) {
	if (DEBUG)
	    console.log("[LoginView] initialize")
	var self = this;
	this.session = session

	//LoginView:siginin:error - display form errors
	self.listenTo(app.vent,
		      "LoginView:signin:error",
		      self.show_error)

	//redirect off login view page after login
	app.vent.once("Session:logged-in", 
		      self.redirect, 
		      self)

	_(this).bindAll('close')
    },

    signup : function(e) {
	if (DEBUG)
	    console.log("[LoginView] signup")
	e.preventDefault()
	Backbone.history.navigate("/signup", {trigger:true})
    },

    redirect: function() {
	if (DEBUG)
	    console.log("[LoginView] redirect")
	Backbone.history.navigate("/", {trigger:true})
	return
    },

    render : function() {
	if (DEBUG)
	    console.log("[LoginView] render")

	/*only render login screen if logged out
	 *if it's indetermined, we'll listen for 
	 *an updated session change
	 *onus on other listeners
	 */
	if (DEBUG)
	    console.log(this.session.get("state"))
	if (this.session.get("state") == app.Session.SessionState.LOGGEDOUT) {
	    return this._render()
	}
	this.session.once('change', this.render, this)
	this.$el.html("")
	return this;
    },

    _render: function() {
	if (DEBUG)
	    console.log("[LoginView] __render")
	this.$el.html(this.template(
	    {
		forgotpassword_link: "/meow#forgot", 
		signup_link: "/meow/#signup"
	    }
	) );
	return this;
    },

    show_error: function(jqXHR) {
	if (DEBUG)
	    console.log("[LoginView] showerror")
	var msg = jqXHR.responseJSON.error
	$('.errormessage').html(msg)
	$('.errormessage').show()
	$('.input-label-prefix > span').css("color", "orangered")
    },

    submit : function(e) {
	e.preventDefault();
	if (DEBUG)
	    console.log("Submit")

	var data = {
	    user : {
		email : $("input#user_email").val(),
		password : $("input#user_password").val()
	    },
	};

	//sends sign-in request w/ credentials
	this.sign_in(data)
    },


    sign_in: function(login_data) {
	if (DEBUG)
	    console.log("[LoginView] sign_in")
	var self = this;

	app.vent.trigger(
	    "Request",
	    'POST',
	    '/users/sign_in.json', 
	    login_data,
	    //success
	    function(data) { 
		if ( ('user' in data) && 
		     data.user.id && 
		     data.user.email) {

		    self.session.set("state", 
				     app.Session.SessionState.LOGGEDIN)
		} else {
		    self.session.set("state", 
				     app.Session.SessionState.LOGGEDOUT)
		}

		/*update auth token*/
		$("meta[name=csrf-token]").attr("content", $.cookie('csrf_token') )

		if (DEBUG)
		    console.log("state: " + self.session.get("state"))

		app.vent.trigger("Session:logged-in", data) 
	    },
	    //eror
	    function(jqXHR, textStatus, errorThrown) {
		if (DEBUG)
		    console.log("[LoginView:sign_in] error")

		//updates form for error handling validation
		app.vent.trigger("LoginView:signin:error", jqXHR)
	    }
	)

    },



    close: function() {
	if (DEBUG)
	    console.log("[LoginView] close")
	this.remove()
	this.unbind()
    }


});
