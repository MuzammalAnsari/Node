const mongoose = require('mongoose');

// Connect to the database
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'

// Connect to the database
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;


//defines event listener for db connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('connected', ()=>{
    console.log('connected to DB server')
})

db.on('disconnected', ()=>{
    console.log('disconnected to DB server')
})

module.exports = db