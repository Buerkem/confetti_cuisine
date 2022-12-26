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

    userView : (req, res, next) =>{
        let userId = req.params.user_id;
        User.findById(userId).then( user=>{
            res.render("./users/show", {u: user})
        }
        )
    },

    editView : (req, res, next) =>{
        let userId = req.params.userId;
        User.findById(userId).then( user =>{
            console.log(user);
            res.render("./users/edit", {user:user})
        }
        )
    },
    
    indexView: (req, res) =>{
        res.render("users", {users: res.locals.users})
    },

    newView : (req, res) => {
        res.render("users/new", {users: res.locals.users})
    },

    redirectView: (req, res, next)=>{
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    create: (req, res, next) =>{
        let newUser = new User({
            name: {
                first: req.body.first,
                last: req.body.last
            },

            email: req.body.email,
            zipCode: req.body.zipCode,
            password: req.body.password,
        })     
        newUser.save().then(
            user=>{
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            }
        )
    }
}