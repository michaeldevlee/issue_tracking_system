const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path:'./config/.env'});
const connectDB = require('./config/database');
const issueRoutes = require('./routes/issues');
const userRoutes = require('./routes/users')

app.use(express.json());

app.use('/issues', issueRoutes)
app.use('/users', userRoutes)

connectDB();


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running!`);
})