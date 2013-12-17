var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var _ = require('underscore');

module.exports.FBLogin = function(){
	 passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    })
}