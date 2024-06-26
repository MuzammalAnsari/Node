const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

const PORT = process.env.PORT || 3000;

//Middleware function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to  : ${req.originalUrl}`
  );
  next(); // move to the next phase
};

app.use(logRequest);



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel");
});

// app.get('/chicken', (req, res) => {
//     var chicken={
//         age:1,
//         quantity:2,
//         name:'hen'
//     }
//     res.send(chicken)
// })

// app.post('/chicken', (req, res) => {
//     var chicken = {
//         age: Number,
//         quantity: Number,
//         name: String
//     }
//     res.send(chicken)
// })

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

//import the menuItem route file
const menuItemRoutes = require("./routes/menuItemRoutes");
app.use("/menu", localAuthMiddleware, menuItemRoutes);

app.listen(PORT, () => {
  console.log("server is running on port 3000");
});
