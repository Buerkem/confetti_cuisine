const Course = require("../models/course"),
User = require("../models/user"),
httpStatus = require("http-status-codes");

module.exports = {
    index : (req,res, next) =>{
        Course.find({}).then(
            courses => {
                res.locals.courses = courses;
                next()
            }
        ).catch(error => {console.log($(error.message))})
    },

    indexView: (req, res)=>{
        res.render("./courses/index", {courses: res.locals.courses}) 
    },

    respondJSON: (req, res)=>{
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },

    errorJSON: (error,req,res, next)=>{
        let errorObject;

        if (error){
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
       } else {
           errorObject = {
               status: httpStatus.INTERNAL_SERVER_ERROR,
               message: "Unknown Error"
           }
       }

       res.json(errorObject);
    },

    join: (req, res,next) =>{
        let courseId = req.params.id;
        currentUser = req.user;

        if (currentUser){
            User.findByIdAndUpdate(currentUser, {
                $addToSet: {
                    courses: courseId
                }
            }).then(
                ()=>{
                    res.locals.success = true;
                    next();
                }
            ).catch(error=>{
                next(error)
            });
        } else {
            next (new Error("User must log in."));
        }
    }
}