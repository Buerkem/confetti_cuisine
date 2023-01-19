const port=3000,
express = require("express"),
router = require("./routes/index"),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts"),
errorController = require("./controllers/errorController"),
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

app.use("/", router)

app.use(errorController.pageNotFoundError)
app.listen(port, ()=>{console.log(`App is listening on ${port}`)})