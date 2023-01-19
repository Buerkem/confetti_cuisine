const Course = require("../models/course");

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
        if (req.query.format == "json"){
            res.json(courses);
        }

        else {
            res.render("./courses/index", {courses: res.locals.courses}) 
        }
    },
}