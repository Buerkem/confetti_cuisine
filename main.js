const port=3000,
express = require("express"),
userController = require("./controllers/userController"),
errorController = require("./controllers/errorController"),
ejs = require("ejs")
app = express();

app.set("view engine", 'ejs')
app.use( express.static( "public" ) );

app.get("/", userController.indexView)
app.use(errorController.pageNotFoundError)

app.listen(port, ()=>{console.log(`App is listening on ${port}`)})