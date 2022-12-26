const port=3000,
express = require("express"),
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

app.get("/", userController.index, userController.indexView)
//app.get("/index", userController.indexView)
app.get("/contact", subscriberController.getSubscriptionPage)
app.get("/subscribers", subscriberController.getAllSubscribers)
app.get("/courses", courseController.CourseView)
app.post("/subscribe", subscriberController.saveSubscriber)

app.use(errorController.pageNotFoundError)

app.listen(port, ()=>{console.log(`App is listening on ${port}`)})