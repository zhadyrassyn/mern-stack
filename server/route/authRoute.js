const app = require('express');
const route = app.Router();

const User = require('./../db/model/user');

route.post('/api/auth/sign-up', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  // const {firstName, lastName, email, password } = req.body;
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  // const user = new User({ firstName, lastName, email, password })

  user.save().then((savedUser) => {
    res.status(201).send({
      savedUser: savedUser,
    })
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
});

route.post('/api/auth/sign-in', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email})
    .then((user) => {
      if (user == null) {
        res.status(404).send();
      } else {
        user.compare(password, function(isEqual) {
          if (isEqual == false) {
            res.status(404).send();
          } else {
            res.status(200).send({
              user: user
            });
          }
        });
      }
    }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  })
});

module.exports = route;
