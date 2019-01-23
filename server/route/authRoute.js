const app = require('express');
const route = app.Router();

const User = require('./../db/model/user');

const jwt = require('jsonwebtoken');
const passport = require('../services/passport');

const requireSignIn = passport.authenticate('local', {session: false});
const requireAuth = passport.authenticate('jwt', {session: false});

const generateToken = (user) => {

  return new Promise((resolve, reject) => {
    jwt.sign({
      id: user._id,
      email: user.email
    }, 'secretKey', {
      expiresIn: '2h',
    }, (err, token) => {
      if (err) reject(err);
      resolve(token)
    })
  });
};


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
    const token = generateToken(savedUser).then((token) => {
      res.status(201).send({
        token
      }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
      })
    })
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
});

route.post('/api/auth/sign-in', requireSignIn, (req, res) => {
  generateToken(req.user).then((token) => {
    res.send({
      token: token
    })
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  })
});

route.get('/api/secret', requireAuth, (req, res) => {
  console.log(req.user);
  res.send({message: 'SecretMessage'});
});

module.exports = route;
