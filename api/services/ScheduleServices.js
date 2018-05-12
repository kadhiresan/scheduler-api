/**
* Schedule Services
*/
var fs = require('fs');
const dbFile = sails.config.globals.dbFile;

module.exports = {

	find: function (userId, cb) {
		fs.readFile(dbFile, function(err, content) {
            if (err)
                return cb(err);

            var dbContent = JSON.parse(content);
            cb(null, _.where(dbContent.schedule, {user: userId}))
        });
	},

    add: function (user, input, cb) {
        input.client = user.id; //logged in user will be an client
        
        //Read data from file
        fs.readFile(dbFile, function(err, content) {
            if (err)
                return cb(err);

            var dbContent = JSON.parse(content);
            input.id = dbContent.schedule.length+1;
            input.id = input.id.toString(); 
            dbContent.schedule.push(input);

            //Store updated data into the file
            fs.writeFile(sails.config.globals.dbFile, JSON.stringify(dbContent)); 
           
            cb(null, {message: "Added Successfully", status:200})
        });
    },

    delete: function (scheduleID, cb) {
        //Read data from file
        fs.readFile(dbFile, function(err, content) {
            if (err)
                return cb(err);

            var dbContent = JSON.parse(content);
            
            //Delete the data
            dbContent.schedule = _.without(dbContent.schedule, _.findWhere(dbContent.schedule, {id: scheduleID}));
           
            //Store updated data into the file
            fs.writeFile(sails.config.globals.dbFile, JSON.stringify(dbContent)); 
           
            cb(null, {message: "Deleted Successfully", status:200})
        });
    },

};