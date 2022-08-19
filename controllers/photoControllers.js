const Photo = require('../Models/Photo');
const fs = require('fs');
const fileUpload = require('express-fileupload');

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1;
  const photosPerPage = 3;
  const totalPhotos = await Photo.find().countDocuments().sort('-dataCreated');

  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);

  res.render('index', {
    photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';
  // if uploadDir doesnt exist, make directory called upload
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // user post the photo datas with form through add.ejs file
  // we catch the datas with req.files.image
  let uploadedImage = req.files.image;
  // create a new file in public file.
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  //
  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name, // image path for save to the db
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
