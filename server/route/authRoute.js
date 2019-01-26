const jwt = require('jsonwebtoken');
const app = require('express');
const passport = require('./../service/passport');
const route = app.Router();

const User = require('./../db/model/user');
const requireSignIn = passport.authenticate('local', {session: false});
const requireAuth = passport.authenticate('jwt', {session: false, failWithError: true});

function generateToken(user) {
  var token = jwt.sign({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName
  }, 'dota2', {
    expiresIn: 10
  });
  return token;
}

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
      token: generateToken(savedUser)
    })
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
});

route.post('/api/auth/sign-in', requireSignIn, (req, res) => {
  res.send({
    token: generateToken(req.user)
  });
});

route.get('/api/secret', requireAuth, (req, res) => {
  res.send('Secret information for authorized users');
}, (err, req, res) => {
  console.log('request ', req);
  console.log('is here?');
  res.json({
    status: 401
  })
});

module.exports = route;
