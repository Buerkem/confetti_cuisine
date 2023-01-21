const mongoose = require('mongoose'),
Course = require("./models/course"),
User = require("./models/user");

mongoose.connect(process.env.MONGODB_URI ||
    "mongodb://localhost:27017/recipe_db",
    {useNewUrlParser: true}
    );

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
 
User.create(sampleUsers, (error, users) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`${users.length} users created and saved in recipe_db`);
        }
    });
    