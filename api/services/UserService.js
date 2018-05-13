/**
* User Services
*/
var fs = require('fs');
const dbFile = sails.config.globals.dbFile;

module.exports = {

	findOne: function (input, cb) {
		fs.readFile(dbFile, function(err, content) {
            if (err)
                return cb(err);

            var dbContent = JSON.parse(content);
            var user = _.where(dbContent.user, input);
            if(user && user.length > 0){
            	delete user[0].password;
            	cb(err, user[0]);
            }else{
            	cb(err, null);
            }
        });
	},

    findByIDs: function (userIds, cb) {
        fs.readFile(dbFile, function(err, content) {
            if (err)
                return cb(err);

            var userObjList = {};
            var dbContent = JSON.parse(content);
            
            _.each(userIds, function(userID){
                var user = _.where(dbContent.user, {id: userID});
                user = user[0];
                delete user.password;
                userObjList[userID] = user;
            });

            cb(null, userObjList);
        });
    },

    getAllUserByID: function (cb) {
        fs.readFile(dbFile, function(err, content) {
            if (err)
                return cb(err);

            var userObjList = {};
            var dbContent = JSON.parse(content);
            
            _.each(dbContent.user, function(userObj){
                userObjList[userObj.id] = userObj;
            });

            cb(null, userObjList);
        });
    },

    getListOfUserAvialbeForSchedule: function (user, cb) {
        fs.readFile(dbFile, function(err, content) {
            if (err)
                return cb(err);

            var userObjList = {};
            var dbContent = JSON.parse(content);
            dbContent.user = _.where(dbContent.user, {"canSchedule":false});;

            //Data manipulation
            _.each(dbContent.user, function(item){
                delete item.password;
            });
            
            cb(null, dbContent.user);
        });
    }

};