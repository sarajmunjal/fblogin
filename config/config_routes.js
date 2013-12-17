var mongoose = require('mongoose');
var passport = require('passport');

module.exports = function(app) {


	//Check if a User is authenticated

	function checkAuthenticated() {
		return function(req,res,next) {
			if (req.isAuthenticated()) {
				next();
			} else {
				res.send({	'status': 'error',
							'message': 'Authentication failed on server',
							'info': ''
				});
			}
		}
	}


	//Function to check the role of a User
	/*
    function requireRole(role) {
        return function(req, res, next) {
            if (req.isAuthenticated() && req.user.role === role && req.user.validated)
                next();
            else {
				res.send({	'status': 'error',
							'message': 'Authentication failed on server',
							'info': JSON.stringify(err)
				});
            }
        };
	}   	

*/
	// Route to send mail for forgotten passwords
	

	//Change password and reset passwords
	

	//Image uploader to upload images to S3
	

	//Register user and login as well as other auth routes


	(function authentication_routes() {
		var AuthCtrl = require('../controllers/auth');
//		var MailerCtrl = require('../controllers/mailer');
		app.get('/api/v1/auth/facebook',AuthCtrl.FBLogin, function(req,res) {});

        app.get('/api/v1/auth/facebook/callback',
         passport.authenticate('facebook', { failureRedirect: '/login' }),
         function(req, res) {
         // Successful authentication, redirect home.
         console.log("Successful!!");
         res.send(200,{status:'success', user: req.user});
         });
	/*	app.get('/api/v1/auth/logout', AccountCtrl.logout);
		app.get('/api/v1/auth/users', AccountCtrl.query);
		app.get('/api/v1/auth/users/:user_id', AccountCtrl.read);
		app.put('/api/v1/auth/users/:user_id', AccountCtrl.update);
		app.put('/api/v1/auth/users/validate/:user_id', AccountCtrl.validateByConsole);
		app.put('/api/v1/auth/validate/email/:token', AccountCtrl.setEmailValidated)
		app.delete('/api/v1/auth/users/:user_id', AccountCtrl.delete);
	*/

	})();

/*
	//Create new users and view all users
	(function manage_users_routes() {
		var UserCtrl = require('../controllers/manage_user');
		app.post('/api/v1/auth/register/user', UserCtrl.register);
		app.get('/api/v1/getusers/:user_id', UserCtrl.getManagers);
	})();
*/

	//Outlet CRUD routes
	


	//Program CRUD routes
	

	//Offer CRUD routes
	


	//Voucher CRUD routes
	


	//Voucher CRUD routes
	

	//User profile management routes
	


	//Checkin CRUD routes
	


	//Favourites management routes
	


	//Recommendation routes
	
	//Beta launchpage and User signup routes
	(function handle_defaults() {
		app.use(function (req,res){
			res.end('404 - Page not found');
		});
	})();
};