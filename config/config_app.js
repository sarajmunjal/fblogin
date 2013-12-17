var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;
var settings = require('./settings');

module.exports = function(app) {
	app.configure(function() {		
		app.use(express.logger('dev'));
		// app.use(express.json())
  //  			.use(express.urlencoded());
		app.use(express.bodyParser());

		app.use(express.cookieParser('some secret'));
		app.use(express.session());
		
		app.use(express.methodOverride());
	    app.use(passport.initialize());
        app.use(passport.session());

		app.use(express.static(__dirname + '/../'));
	    app.use(app.router);
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

//		app.use(express.favicon());

			
		 passport.use(new FacebookStrategy({
         clientID: '250508195115155',
         clientSecret: '035942c929d650baeaab6f574be78a6f',
         callbackURL: '/api/v1/auth/facebook/callback'
        },
        function(accessToken, refreshToken, profile, done) {
         var User = mongoose.model('User');

         User.findOne({ 'facebook.id': profile.id }, function (err, user) {
         if (err) { return done(err) }
         if (!user) {
         user = new User({
         name: profile.displayName,
         email: profile.emails[0].value,
         username: profile.username,
         provider: 'facebook',
         facebook: profile._json
         })
         user.save(function (err) {
         if (err) console.log(err)
         return done(err, user)
         })
         }
         else { 
         return done(err, user)
         }
         })
        }
        ))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	    passport.serializeUser(function(user, done) {
                done(null, user.id)
        });

        passport.deserializeUser(function(id, done) {
                User.findOne({ _id: id }, function (err, user) {
                 done(err, user)
                })	
	});
       })

app.all("/api/*", function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "  X-Requested-With,Content-Type");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
      return next();
    });	
	// Connect to the database
	mongoose.connect(settings.values.db)

};