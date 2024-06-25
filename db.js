const mongoose = require('mongoose');
require('dotenv').config()

// Connect to the database
// const mongoURL = process.env.MONGODB_URL_LOCAL

   const mongoURL = process.env.MONGODB_URL


// Connect to the database
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;


//defines event listener for db connection

db.on('error', () => {
    console.log('Error occurred while connecting to the database');
});

db.on('connected', ()=>{
    console.log('connected to DB server')
})

db.on('disconnected', ()=>{
    console.log('disconnected to DB server')
})

module.exports = db