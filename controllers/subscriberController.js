const Subscriber = require("../models/subscriber")

module.exports = {
    getAllSubscribers : (req, resp, next)=>{
        Subscriber.find({}).then(
            subscribers => {
                resp.locals.subscribers = subscribers;
                next()
            }
        )   
     },

    getSubscriptionPage : (req, resp)=>{
        resp.render("./subscribers/contact")
    },
    
    editView : (req, res, next) =>{
        let subscriberId = req.params.subscriberId;
        Subscriber.findById(subscriberId).then( subscriber =>{
            res.render("./subscribers/edit", {subscriber:subscriber})
        }
        )
    },
    
    update: (req,res,next)=>{
        let newParam = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        }
        let subscriberId= req.params.subscriberId; 
        Subscriber.findByIdAndUpdate(subscriberId, {$set: newParam}).then(
         subscriber => {
             res.locals.redirect = `/subscribers/${subscriberId}`;
             res.locals.subscriber = subscriber;
             next();
        }   
        ).catch(error => {
            console.log(`Error updating subscriber
             by ID: ${error.message}`);
            next(error);
            });
    },

    redirectView: (req, res, next)=>{
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    
    subscriberView: (req, res, next) =>{
        let  subscriberId = req.params.subscriberId;
        console.log(subscriberId);
        console.log("khjkhkh");
        Subscriber.findById(subscriberId).then( subscriber =>{
            res.render("./subscribers/show", {s: subscriber})
        }
        )
    },

    indexView : (req, resp)=>{
        let subscribers = resp.locals.subscribers;
        resp.render("./subscribers/index", {subscribers: subscribers})
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
