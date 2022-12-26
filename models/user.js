const subscriber = require("./subscriber");

const mongoose = require("mongoose"),
Subscriber = require("./subscriber"),
{Schema} = mongoose,

userSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },

        last: {
            type: String,
            trim: true
        }
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999,
    },

    password: {
        type: String,
        required: true
    },

    courses: [{type: Schema.Types.ObjectId, ref: "Course"}],
    subscribedAccount: {type: Schema.Types.ObjectId, ref: "Subscriber"}
    },{timestamps: true}

    )

userSchema.virtual("fullName").get(function(){
    return `${this.name.first} ${this.name.last}`;
})

userSchema.pre("save", function(next){
    let user  = this;
    if (!('subscribedAccount') in user){
        Subscriber.findOne({
            "email" : user.email
        }).then(subscriber=> {
            user.subscribedAccount = subscriber;
            next();}).catch(error => {
                console.log("Error connecting to subscriber");
                next(error);
            })
    }
    else {
        next();
    }
})

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    {useNewUrlParser: true}
    );
module.exports = mongoose.model("User", userSchema);