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

    items: [],

    zipCode: {
        type: Number,
        min: [10000, "Zip code too short"],
        max: 99999
    }
})

module.exports = mongoose.Model("Course",courseSchema)