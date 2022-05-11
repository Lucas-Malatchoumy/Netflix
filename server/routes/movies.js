const express = require("express");
const router = express.Router();
const {
    getLastMovies,
    getActionMovies,
    getFantasticMovies,
    getHorrorMovies,
    getSciFiMovies,
    getComedyMovies,
    getDramaMovies,
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
router.get('actionMovies', getActionMovies);
router.get('fantasticMovies', getFantasticMovies);
router.get('horrorMovies', getHorrorMovies);
router.get('sci-fiMovies', getSciFiMovies);
router.get('comedyMovies', getComedyMovies);
router.get('dramaMovies', getDramaMovies)
router.get('/:movie', getMovie);
router.get('/searchByGenre');
router.get('/searchByTitle');
router.get('/:movie/actors', getMovieActor);
router.get('/search/:search', search);

module.exports = router;