const mongoose = require('mongoose'),
Course = require("./models/course"),
User = require("./models/user");
dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to Mongo!');
})
.catch((err) => {
  console.error('Error connecting to Mongo', err);
});

const sampleUsers = [
        {
          name: { first: "John", last: "Doe" },
          email: "johndoe@example.com",
          zipCode: 12345,
          password: "password123"
        },
        {
          name: { first: "Jane", last: "Smith" },
          email: "janesmith@example.com",
          zipCode: 54321,
          password: "password456"
        }
      ];

const sampleCourses = [
        {
        name: "Making Biryani",
        description: "Teaches how to make the tasty Indian Biryani",
        price: 30
        },
        {
        name: "Introduction to French Cuisine",
        description: "Learn the basics of French cooking and prepare classic dishes",
        price: 50
        },
        {
        name: "Sushi Making Workshop",
        description: "Learn how to make sushi like a pro with hands-on instruction",
        price: 40
        },
        {
        name: "Bake like a Pro",
        description: "Master the art of baking with this comprehensive course",
        price: 60
        },
        {
        name: "Mixology 101",
        description: "Become a mixology expert and learn how to make delicious cocktails",
        price: 35
        }
        ]
        


User.create(sampleUsers, (error, users) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`${users.length} users created and saved in recipe_db`);
        }
    });

Course.create(sampleCourses, (error, courses) => {
      if (error) {
          console.log(error);
      } else {
          console.log(`${courses.length} users created and saved in recipe_db`);
      }
  });