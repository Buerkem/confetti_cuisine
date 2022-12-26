User = require("./models/user")
Subscriber = require("./models/subscriber")

User.create({
  name: {
    first: "Jon",
    last: "Wexler "
  },
  email: "jon@jonwexler.com",
  password: "pass123"
})
  .then((user) => {
    testUser = user;
    user.name = `${user.name.first} ${user.name.last}`;
    return Subscriber.findOne({
      email: user.email,
    });
  })
  .then((subscriber) => {
    testUser.subscribedAccount = subscriber;
    return testUser.save();
  })
  .then(() => console.log("user updated"))
  .catch((error) => console.log(error.message));

