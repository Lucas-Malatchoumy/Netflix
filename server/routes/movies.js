const express = require("express");
const { checkToken } = require("../middlewares/auth")
const router = express.Router();
const {
    getLastMovies,
    getMovie,
    getMovies,
    getGenres,
    getMovieActor,
    search,
    getmostViewed
} = require('../controllers/movies')

router.get('/getmostView', getmostViewed);
router.get('/getlastMovies', getLastMovies);
router.get('/genres/:genre', getMovies)
router.get('/genres', getGenres)
router.get('/:movie', checkToken, getMovie);
router.get('/:movie/actors', getMovieActor);
router.get('/search/:search', search);

module.exports = router;