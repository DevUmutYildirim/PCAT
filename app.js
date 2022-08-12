const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();

// if we dont type next(); , function doenst continue to another middleware function. 
// next function is like the break function of if ef/else, while, switch case loops.
const myLogger = (req, res, next) => {
    console.log("Middleware log 1");
    next();
}

const myLogger2 = (req, res, next) => {
    console.log("Middleware log 2");
    next();
}

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static('public'))
app.use(myLogger);
app.use(myLogger2);

// ROUTES
// also app.get and root are middleware functions. 
app.get('/', (req, res) => {
    res.render("index");
})
app.get('/about', (req, res) => {
    res.render("about");
})
app.get('/add', (req, res) => {
    res.render("add");
})


const port = 3000;
app.listen(port, () => {
    console.log('Server is started on ' + port + 'port');
})