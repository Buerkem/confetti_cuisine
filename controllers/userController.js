const User = require("../models/user");

module.exports = {
    index : (req,res, next) =>{
        User.find({}).then(
            users => {
                res.locals.users = users;
                next()
            }
        )
    },
    
    indexView: (req, res) =>{
        res.render("users/new", {users: res.locals.users})
    },
}