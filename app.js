const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
// most of the browsers doesn't support the request except get and post,
// so we have to use methodOverride middleware.
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// if we import a middleware as require at start of the code,
// we need to use it with app.use method.
// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // read the data from the url
app.use(express.json()); // convert the data to JSON
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddedPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log('Server is started on ' + port + ' port');
});
