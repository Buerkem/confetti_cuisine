const mongoose = require("mongoose"),

courseSchema = mongoose.Schema({
    title: {
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
        default: 0,
        min: [0, "Course cannot have a negative number of students"]
    },

    cost: {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative cost"]
    },
    },
    {
        timestamps: true
    }

)

module.exports = mongoose.Model("Course",courseSchema)