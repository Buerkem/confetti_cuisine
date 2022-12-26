const User = require("../models/user");

module.exports = {
    indexView: (req, res) =>{
        User.find({}).then(
            users => {
                res.render("users/index", {users: users})
            }
        )
    },

}