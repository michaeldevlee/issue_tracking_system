const express = require('express');
const app = express();
const passport = require('passport');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path:'./config/.env'});
const connectDB = require('./config/database');
const issueRoutes = require('./routes/issues');
const userRoutes = require('./routes/users')
const mainRoutes = require('./routes/main')

// Passport config
require('./config/passport')(passport)

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
  

app.use('/issues', issueRoutes)
app.use('/users', userRoutes)
app.use('/', mainRoutes)




app.listen(process.env.PORT || 2121, ()=>{
    console.log(`Server is running! on port ${process.env.PORT}`);
})