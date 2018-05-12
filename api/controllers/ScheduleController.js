/**
 * ScheduleController
 *
 * @description :: Server-side actions for handling incoming requests.
 */

module.exports = {
  
	get: function(req, res) {
		Schedule.get(req.user, function(err, scheduleList) {
			if(err)
				return res.badRequest(err);
			
			res.json(scheduleList);
		});
	},

	add: function(req, res) {
		if(!req.body || !req.body.scheduleDate || !req.body.user || !req.body.description)
			return res.badRequest({message : "parameter(s) is missing", status: 400});

		Schedule.add(req.user, req.body, function(err, scheduleRes) {
			if(err)
				return res.badRequest(err);
			
			res.json(scheduleRes);
		});
	},

	delete: function(req, res) {
		if(!req.param('id'))
			return  res.negotiate({message : "parameter(s) is missing", status: 400});

		Schedule.delete(req.param('id'), function(err, scheduleRes) {
			if(err)
				return res.negotiate(err);
			
			res.json(scheduleRes);
		});
	},
};

