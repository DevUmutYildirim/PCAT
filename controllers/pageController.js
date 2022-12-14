const Photo = require('../Models/Photo');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddedPage = (req, res) => {
  res.render('add');
};

exports.getEditPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};
