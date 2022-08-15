const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./Models/Photo');

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({extended: true})) // read the data from the url
app.use(express.json()) // convert the data to JSON

// ROUTES
// app.get and root are middleware functions. 
app.get('/', async (req, res) => {
    const photos = await Photo.find({}) // find all Photos from the database
    res.render('index', {               // post the index template engine
        photos
    });
});

app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('photo', {
        photo
    })
});

app.get('/about', (req, res) => {
    res.render("about");
});
app.get('/add', (req, res) => {
    res.render("add");
});
// take the request body and post to the pcat-test-db.photos collection
app.post('/photos', async (req, res) => {
    await Photo.create(req.body)
    res.redirect('/')
});

const port = 3000;
app.listen(port, () => {
    console.log('Server is started on ' + port + ' port');
})