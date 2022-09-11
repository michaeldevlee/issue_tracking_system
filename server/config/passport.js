const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/Users');


module.exports = function (passport) {
    passport.use(new LocalStrategy( {
      usernameField : 'userName',
      passwordField : 'password',
    }, (username, password, done) => {
      User.findOne({ username: username.toLowerCase() }, (err, user) => {
        if (err) { return done(err) }
        if (!user) {
          return done(null, false, { msg: `Username ${username} not found.` })
        }
        if (!user.password) {
          return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) { return done(err) }
          if (isMatch) {
            return done(null, user)
          }
          return done(null, false, { msg: 'Invalid username or password.' })
        })
      })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
      })
    
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
      })
    }