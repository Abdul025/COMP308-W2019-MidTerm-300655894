/*
File Name: Books 
Author's Name: Tom Tsiliopoulos
Name: Abdulghafor Nurali
Student Number: 300655894
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require("passport");
// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
      res.render('books/details', {
        title: 'Add New Book',
        books: ""
      });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  /*console.log(req.body);*/

//making a new book and adding the details
  let newBook = book ({
    Title: req.body.title,
    Author: req.body.author,
    Price: req.body.price,
    Genre: req.body.genre
  });

  book.create(newBook, (err, book) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      // redirect to the books page
      res.redirect('/books');
    }

  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    let id = req.params.id;

    book.findById(id, (err, bookObject) => {
      if(err){
        console.log(err);
        res.end(err);
      }
      else
      {
        //to display edit view
        res.render('books/details', {
          title: 'Books',
        books: bookObject

        });
      }

    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;

  let updatedBook = book({
    _id: id, 
    Title: req.body.title,
    Author: req.body.author,
    Price: req.body.price,
    Genre: req.body.genre
  });

  book.update({_id: id}, updatedBook, (err) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else
    {
      // redirect to the books page
      res.redirect('/books');
    }

  });
    

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    let id = req.params.id;

    book.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // redirect to the books page
            res.redirect('/books');
        }
    });
});


module.exports = router;
