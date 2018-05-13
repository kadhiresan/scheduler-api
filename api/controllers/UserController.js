/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming "all type for user related" requests.
 */

module.exports = {
 	login: function(req, res) {
		if(!req.body || !req.body.userName || !req.body.password)
			return res.badRequest({message : "parameter(s) is missing", status: 400});
	
		User.login(req.body, function(err, userObj) {
			if(err)
				return res.badRequest(err);
			
			res.json(userObj);
		});
	},

	signup: function(req, res) {
		if(!req.body || !req.body.userName || !req.body.password || !req.body.timeZone)
			return res.badRequest({message : "parameter(s) is missing", status: 400});
	
		User.signup(req.body, function(err, userObj) {
			if(err)
				return res.badRequest(err);
			
			res.json(userObj);
		});
	},

	getListOfUserAvialbeForSchedule: function(req, res) {
		if(!req.user || !req.user.canSchedule)
			return res.badRequest({message : "parameter(s) is missing", status: 400});
	
		User.getListOfUserAvialbeForSchedule(req.user, function(err, userList) {
			if(err)
				return res.badRequest(err);
			
			res.json(userList);
		});
	},

};

