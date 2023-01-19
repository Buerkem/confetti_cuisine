const passport = require("passport");
const User = require("../models/user");

module.exports = {
    index : (req,res, next) =>{
        User.find({}).then(
            users => {
                res.locals.users = users;
                next()
            }
        ).catch(error => {console.log($(error.message))})
    },

    delete: (req, res, next) =>{
        let userId = req.params.userId;
        User.findByIdAndRemove(userId).then(
            ()=>{
                res.locals.redirect = "/users";
                next();
            }
        ).catch(error => {
            console.log(`Error deleting user by ID: ${error.message}`);
            next();
            });       
    },

    update: (req,res,next)=>{
        let newParam = {
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        }
        let userId = req.params.userId;        
        User.findByIdAndUpdate(userId, {$set: newParam}).then(
         user => {
             res.locals.redirect = `/users/${userId}`;
             res.locals.user = user;
             console.log(user);
             next();
        }   
        ).catch(error => {
            console.log(`Error updating user
             by ID: ${error.message}`);
            next(error);
            });
    },

    userView : (req, res, next) =>{
        let userId = req.params.user_id;
        User.findById(userId).then( user=>{
            res.render("./users/show", {u: user})
        }
        )
    },

    authenticate: passport.authenticate("local",{
        failureRedirect: "/users/login",
        failureFlash: "Failed to login",
        successRedirect: "/",
        successFlash: "Logged in!" 
    }),

    logout: (req, res, next) => {
        req.logout(error=> {console.log(error)});
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
        },

    editView : (req, res, next) =>{
        let userId = req.params.userId;
        User.findById(userId).then( user =>{
            res.render("./users/edit", {user:user})
        }
        )
    },
    
    indexView: (req, res) =>{
        console.log(res.locals.flashMessages);
        console.log('flash message above');
        res.render("users", {users: res.locals.users})
    },

    newView : (req, res) => {
        res.render("users/new")
    },

    loginView: (req, res) =>{
        res.render("users/login")
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
        User.register(newUser, req.body.password, (error, user)=>{
            if (user){
                req.flash("success", `${newUser.fullName}'s account created successfully!`);
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            }
            else{
                req.flash("error",`Failed to create user account because: ${error.message}.` )
                res.locals.redirect = "/users/new";
                next();
            }
        }
        )
    }
}