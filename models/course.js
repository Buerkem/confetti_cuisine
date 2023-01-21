const { name } = require("ejs");

const mongoose = require("mongoose"),

courseSchema = mongoose.Schema({
    name: {
        required: true,
        unique: true,
        type: String,
    },
    description: {
        type: String,
        required: true
    },

    maxStudents: {
        type: Number,
        default: 100,
        min: [0, "Course cannot have a negative number of students"]
    },

    price : {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative cost"]
    },
    },
    {
        timestamps: true
    }
)

    /*
Course = mongoose.model("Course",courseSchema)
var testCourse
Course.create({
    name: "Making Biryani",
    description: "Teaches how to make the tasty Indian Biryani",
    price: 10
}
).then(course => {
    testCourse = course
    testCourse.save()
})
.catch(error => console.log(error.message));
*/

module.exports = mongoose.model("Course",courseSchema)