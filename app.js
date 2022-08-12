const express = require('express');
const path = require('path');

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

// MIDDLEWARES
app.use(express.static('temp'))
app.use(myLogger);
app.use(myLogger2);

// also app.get and root are middleware functions. 
app.get('/', (req, res) => {

    // __dirname is the current folder.
    res.sendFile(path.resolve(__dirname, 'temp/index.html'))

    // const photo = {
    //     id: 1,
    //     name : "Photo name",
    //     description : "Photo description"
    // }
    // res.send is like the next function in middleware.
    // res.send(photo);
})

const port = 3000;
app.listen(port, () => {
    console.log('Server is started on ' + port + 'port');
})