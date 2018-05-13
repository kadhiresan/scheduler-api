/**
 * Schedule.js
 *
 * @description :: A model for managing all Schedule related activities
 */

module.exports = {

    attributes: {

    },
    /**
    * ip: user = {"userName": "---","timeZone": "---","canSchedule": -,"id": "--"}
    * Get all the user from file based on logged in user id, output will be array of object
    */
    get: function(user, cb) {
        ScheduleServices.find(user.id, function(err, scheduleList){
            if (err){
                sails.log("Schedule get Error::", err);
                return cb({message : "something went wrong please try after some time", status: 400});
            }

            if(scheduleList && scheduleList.length > 0){
                //Get all the client information
                var clientIDs = _.pluck(scheduleList, "client")
                UserService.findByIDs(clientIDs, function(err, clientObjList){
                    if(err)
                        return cb(err);

                    _.each(scheduleList, function(scheduleObj, idx){
                        scheduleList[idx].client = clientObjList[scheduleList[idx].client];
                    });

                    cb(null, scheduleList);
                });
            }else{
                cb(null, scheduleList);
            }
        });
    },
    /**
    * ip: user = {"userName": "---","timeZone": "---","canSchedule": -,"id": "--"} and input = {"user": "--","client": "--","scheduleDate": "date with time"}
    * Book an new appointment with the user, output will be an object
    */
    add: function(user, input, cb) {
        ScheduleServices.add(user, input, function(err, scheduledRes){
            if (err){
                sails.log("Schedule add Error::", err);
                return cb({message : "something went wrong please try after some time", status: 400});
            }

            cb(null, scheduledRes);
        });
    },
    /**
    * ip: id = schedule tabel id
    * Delete an appointment based on the id and return the responce(object)
    */
    delete: function(id, cb) {
        ScheduleServices.delete(id, function(err, deleteRes){
            if (err){
                sails.log("Schedule delete Error::", err);
                return cb({message : "something went wrong please try after some time", status: 400});
            }

            cb(null, deleteRes);
        });
    }
    /**
    * ip: user = {"userName": "---","timeZone": "---","canSchedule": -,"id": "--"} and input = {"scheduleDate": "date with time", "description": "---"}
    * Edit the scheduled appointment based on the id, Allow only date and desc to edit.
    */
    edit: function(user, body, cb) {
        ScheduleServices.edit(user, body, function(err, editRes){
            if (err){
                sails.log("Schedule delete Error::", err);
                return cb({message : "something went wrong please try after some time", status: 400});
            }

            cb(null, editRes);
        });
    }

};

