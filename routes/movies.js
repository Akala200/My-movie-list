const express = require('express');
const Movie = require('../models/movie');

const router = express.Router();

// Show all movies
router.get('/list', (req, res) => {
  // load all movies from the database
  Movie.find({}, (err, movies) => {
    if (err) {
      // eslint-disable-next-line
      console.log(err);
    } else {
      // render list template and pass movies to it
      res.render('movies_list', {
        movies,
      });
    }
  });
});

// Add a new movie
router.get('/add', (req, res) => {
  res.render('movies_add');
});

// processing of add movie request
router.post('/add', (req, res) => {
  // construct new movie object for persisting in the database
  const movie = new Movie();
  movie.title = req.body.title;
  movie.director = req.body.director;
  movie.description = req.body.description;

  // save the new object in the database
  movie.save((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } else {
      res.redirect('/movies/list');
    }
  });
});

// Delete movie
router.delete('/:id', (req, res) => {
  const query = { _id: req.params.id };

  Movie.remove(query, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      res.redirect('/');
    } else {
      res.send('Success');
    }
  });
});

module.exports = router;
