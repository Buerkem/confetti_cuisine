const mongoose = require("mongoose"),

subscriberSchema = mongoose.Schema({
    name : String,
    email : String,
    zipCode: Number
});

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    {useNewUrlParser: true}
    );

mongoose.Promise = global.Promise;

module.exports = mongoose.model("Subscriber", subscriberSchema);