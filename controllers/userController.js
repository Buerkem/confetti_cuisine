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
        console.log("hello");
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
        console.log("here")
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

    authenticate: (req, res, next)=>{
        User.findOne({email:req.body.email}).then(user=>{
            if (user){
                user.passwordComparison(req.body.password).then(passwordsMatch =>{
                    if (passwordsMatch){
                        res.locals.redirect =`/users/${user._id}`;
                        req.flash("success", `${user.fullName}'s logged in successfully!`);
                        res.locals.user = user;
                        next();
                    }
                    else{
                        req.flash("error" , "Your account or password is incorrect. Please try again or contact your system administrator!");
                        res.locals.redirect = "/users/login";
                        next();
                    }            
        }).catch(error => {
            console.log(`Error logging in user: ${error.message}`);
            next(error);
            })
        }
    })},

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
        res.render("users/new", {users: res.locals.users})
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
        newUser.save().then(
            user=>{
                req.flash("success", `${newUser.fullName}'s account created successfully!`);
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            }
        )
    }
}