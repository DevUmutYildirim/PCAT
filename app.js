const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
// most of the browsers doesn't support the request except get and post,
// so we have to use methodOverride middleware.
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const Photo = require('./Models/Photo');

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
// app.get and root are middleware functions.
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dataCreated'); // find all Photos from the database
  res.render('index', {
    // post the index template engine
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';
  // if uploadDir doesnt exist, make directory called upload
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // user post the photo datas with form through add.ejs file
  // we catch the datas with req.files.image
  let uploadedImage = req.files.image;
  // create a new file in public file.
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  //
  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name, // image path for save to the db
    });
    res.redirect('/');
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
});

// Delete method
app.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log('Server is started on ' + port + ' port');
});
