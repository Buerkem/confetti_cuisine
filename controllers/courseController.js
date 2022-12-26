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
    CourseView : (req, resp)=>{
        resp.render("./courses/course.ejs", {courses: courses}) 
    }
}