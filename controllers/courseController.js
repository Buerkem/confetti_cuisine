var courses = [
    {
    name: "Event Driven Cakes",
    price: 50
    },
    {
    name: "Asynchronous Artichoke",
    price: 25
    },
    {
    name: "Object Oriented Orange Juice",
    price: 10
    }];
     

module.exports = {
    indexView: (req, res)=>{
        if (req.query.format == "json"){
            res.json(courses);
        }

        else {
            res.render("./courses/index", {courses: courses}) 
        }
    },
}