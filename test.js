// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// connect DB
// mongoose.connect('mongodb://localhost/pcat-test-db', {
//     useNewUrlParser : true,
//     useUnifiedTopology : true
// });

// create schema
// const PhotoSchema = new Schema({
//     title: String,
//     description: String
// })

// create a model and photo collection using PhotoSchema
// const Photo = mongoose.model('Photo', PhotoSchema)

// create a photo
// const createPhoto = Photo.create({
//     title: "User's Photos",
//     description: "My Description"
// })

// read a photo
// const readPhoto = Photo.find({}, (err, data) => {
//     console.log(data);
// })

// update a photo
// const id = "";

// const updatePhoto = Photo.findByIdAndUpdate(
//     id, {
//         title: "Photo title 111 updated",
//         description: "Photo description 1 updated"
//     },
//     {
//         new: true
//     },
//     (err, data) => {
//         console.log(data);
//     }
// )

// delete a photo
// const id2 = "";
// const deletePhoto = Photo.findByIdAndDelete(id2, (err, data) => {
//     console.log("Photo is removed");
// })


// if we dont type next(); , function doenst continue to another middleware function. 
// next function is like the break function of if ef/else, while, switch case loops.
// const myLogger = (req, res, next) => {
//     console.log("Middleware log 1");
//     next();
// }