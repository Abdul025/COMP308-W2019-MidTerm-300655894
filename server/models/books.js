/*
File Name: Books 
Author's Name: Tom Tsiliopoulos
Name: Abdulghafor Nurali
Student Number: 300655894
*/

let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', gamesSchema);
