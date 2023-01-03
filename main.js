const port=3000,
express = require("express"),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts"),
userController = require("./controllers/userController"),
errorController = require("./controllers/errorController"),
subscriberController = require("./controllers/subscriberController"),
courseController = require("./controllers/courseController"),
User = require("./models/user"),
ejs = require("ejs"),
expressSession = require("express-session"),
cookieParser = require("cookie-parser"),
connectFlash = require("connect-flash"),
bodyParser = require('body-parser'),
passport = require('passport'),
app = express();

app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use( express.static( "public" ) );
app.use(layouts);
app.use(methodOverride("_method", {methods: ["POST","GET"]}));

app.use(cookieParser("secret_passcode"));

app.use(expressSession({
    secret: "secret_passcode",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})

app.get("/users", userController.index, userController.indexView)
app.get("/users/login", userController.loginView)
app.get("/users/edit/:userId", userController.editView)
app.get("/subscribers/edit/:subscriberId", subscriberController.editView)
app.get("/users/logout", userController.logout, userController.redirectView)
app.get("/users/:user_id", userController.userView)
app.get("/subscribers/:subscriberId", subscriberController.subscriberView)
app.get("/new", userController.newView)
app.get("/contact", subscriberController.getSubscriptionPage)
app.get("/subscribers", subscriberController.getAllSubscribers, subscriberController.indexView)
app.get("/courses", courseController.CourseView)
app.post("/subscribe", subscriberController.saveSubscriber)
app.post("/users/create", userController.create,userController.index, userController.redirectView)
app.post("/users/login", userController.authenticate)


app.put("/users/:userId/update", userController.update, userController.redirectView)
app.put("/subscribers/:subscriberId/update", subscriberController.update, subscriberController.redirectView)
app.delete("/users/:userId/delete", userController.delete, userController.redirectView)
app.use(errorController.pageNotFoundError)

app.listen(port, ()=>{console.log(`App is listening on ${port}`)})