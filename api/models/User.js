/**
 * User.js
 *
 * @description :: A model for managing all user related activities
 */
var jwt = require('jsonwebtoken');

module.exports = {
    attributes: {

    },
    /**
    * ip: body = {"userName": "---", password: ***..}
    * Verify the user credentials if its true then generate the token(for auth) and return the responce(object)
    */
    login: function(body, cb) {
        UserService.findOne(body, function(err, user){
            if (err){
                sails.log("User login Error::", err);
                return cb({message : "something went wrong please try after some time", status: 400});
            }

            if(!user){
                cb({message : "invalid user credentials", status: 400});
            }else{
                user.token = jwt.sign(user, sails.config.globals.jwt_secret, {expiresIn: "2 days"});
                user.message = "user is logged in successfully";
                cb(null, user);
            }
            
        });
    },
    /**
    * ip: user = {"userName": "---","timeZone": "---","canSchedule": -,"id": "--"}
    * Get all the user who are all avilabe for Schedule(ie, "canSchedule":false), output will be array of objects
    */
    getListOfUserAvialbeForSchedule: function(user, cb) {
        UserService.getListOfUserAvialbeForSchedule(user, function(err, userList){
            if (err){
                sails.log("User getListOfUserAvialbeForSchedule Error::", err);
                return cb({message : "something went wrong please try after some time", status: 400});
            }

            cb(null, userList);
            
        });
    }

};

