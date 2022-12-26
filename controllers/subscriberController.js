
const res = require("express/lib/response");
const subscriber = require("../models/subscriber");
const Subscriber = require("../models/subscriber")

module.exports = {
    getAllSubscribers : (req, resp, next)=>{
        Subscriber.find({}).exec().then(
            subscribers => {
                resp.render("./subscribers/subscribers", {subscribers: subscribers})
            }
        ).catch(error=>{
            console.log(error.message);
            return [];
        }).then(() => {
            console.log("promise complete");
            });
    },

    getSubscriptionPage : (req, resp)=>{
        resp.render("./subscribers/contact")
    },

    saveSubscriber : (req, resp) => {
        let newSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipcode: req.body.zipcode
        })
        newSubscriber.save().then(result => {
            resp.send("thanks")
        }).catch(error => {
            if (error) resp.send(error);
            console.log(error);
        })
    }
}
