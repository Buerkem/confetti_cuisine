
const Subscriber = require("../models/subscriber")

module.exports = {
    getAllSubscribers : (req, resp, next)=>{
        Subscriber.find({}, (error, subscribers) =>{
            if (error) next(error);
            req.data = subscribers;
            next()
        })
    },

    getSubscriptionPage : (req, resp)=>{
        resp.render("./subscribers/contact")
    }

}
