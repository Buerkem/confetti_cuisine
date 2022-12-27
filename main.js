const port=3000,
express = require("express"),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts"),
userController = require("./controllers/userController"),
errorController = require("./controllers/errorController"),
subscriberController = require("./controllers/subscriberController"),
courseController = require("./controllers/courseController"),
ejs = require("ejs"),
bodyParser = require('body-parser');

app = express();

app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use( express.static( "public" ) );
app.use(layouts);
app.use(methodOverride("_method", {methods: ["POST","GET"]}));

app.get("/users", userController.index, userController.indexView)
app.get("/users/edit/:userId", userController.editView)
app.get("/subscribers/edit/:subscriberId", subscriberController.editView)
app.get("/users/:user_id", userController.userView)
app.get("/subscribers/:subscriberId", subscriberController.subscriberView)
app.get("/new", userController.newView)
app.get("/contact", subscriberController.getSubscriptionPage)
app.get("/subscribers", subscriberController.getAllSubscribers, subscriberController.indexView)
app.get("/courses", courseController.CourseView)
app.post("/subscribe", subscriberController.saveSubscriber)
app.post("/users/create", userController.create,userController.index, userController.indexView)


app.put("/users/:userId/update", userController.update, userController.redirectView)
app.put("/subscribers/:subscriberId/update", subscriberController.update, subscriberController.redirectView)
app.delete("/users/:userId/delete", userController.delete, userController.redirectView)
app.use(errorController.pageNotFoundError)

app.listen(port, ()=>{console.log(`App is listening on ${port}`)})