const db = require('../config');

const getAdventureMovies = ((req, res) => {
    let sql = `SELECT movies.image, movies.id, genres.genre, movies.title
    FROM genre_movie
    INNER JOIN genres ON genre_movie.genre_id = genres.id
    INNER JOIN movies ON genre_movie.movie_id = movies.id
    WHERE genre = 'Adventure' ORDER BY RAND () LIMIT 10 ;`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});
const getLastMovies = ((req, res) => {
    let sql = `SELECT title, image, id FROM movies ORDER BY currentDate DESC LIMIT 10`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const getActionMovies = ((req, res) => {
    let sql = `SELECT movies.image, movies.id genres.genre, movies.title
    FROM genre_movie
    INNER JOIN genres ON genre_movie.genre_id = genres.id
    INNER JOIN movies ON genre_movie.movie_id = movies.id
    WHERE genre = 'Action' ORDER BY RAND () LIMIT 10 ;`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const getHorrorMovies = ((req, res) => {
    let sql = `SELECT movies.image, movies.id genres.genre, movies.title
    FROM genre_movie
    INNER JOIN genres ON genre_movie.genre_id = genres.id
    INNER JOIN movies ON genre_movie.movie_id = movies.id
    WHERE genre = 'Horror' ORDER BY RAND () LIMIT 10 ;`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const getFantasticMovies = ((req, res) => {
    let sql = `SELECT movies.image, movies.id genres.genre, movies.title
    FROM genre_movie
    INNER JOIN genres ON genre_movie.genre_id = genres.id
    INNER JOIN movies ON genre_movie.movie_id = movies.id
    WHERE genre = 'Fantasy' ORDER BY RAND () LIMIT 10 ;`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const getSciFiMovies = ((req, res) => {
    let sql = `SELECT movies.image, movies.id genres.genre, movies.title
    FROM genre_movie
    INNER JOIN genres ON genre_movie.genre_id = genres.id
    INNER JOIN movies ON genre_movie.movie_id = movies.id
    WHERE genre = 'Sci-Fi' ORDER BY RAND () LIMIT 10 ;`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const getDramaMovies = ((req, res) => {
    let sql = `SELECT movies.image, movies.id genres.genre, movies.title
    FROM genre_movie
    INNER JOIN genres ON genre_movie.genre_id = genres.id
    INNER JOIN movies ON genre_movie.movie_id = movies.id
    WHERE genre = 'Drama' ORDER BY RAND () LIMIT 10 ;`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const getComedyMovies = ((req, res) => {
    let sql = `SELECT movies.image, movies.id genres.genre, movies.title
    FROM genre_movie
    INNER JOIN genres ON genre_movie.genre_id = genres.id
    INNER JOIN movies ON genre_movie.movie_id = movies.id
    WHERE genre = 'Comedy' ORDER BY RAND () LIMIT 10 ;`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const getMovie = ((req, res) => {
    const id = req.params.movie;
    console.log(req.params);
    let sql = `SELECT * FROM movies WHERE id = '${id}' `;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const getMovies = ((req, res) => {
    const genre = req.params.genre;
    console.log(req.params);
    let sql = `SELECT movies.id, movies.image, movies.id, genres.genre, movies.title
    FROM genre_movie
    INNER JOIN genres ON genre_movie.genre_id = genres.id
    INNER JOIN movies ON genre_movie.movie_id = movies.id
    WHERE genre = '${genre}' ORDER BY RAND () LIMIT 10 ;`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const getMovieActor = ((req, res) => {
    const id = req.params.movie;
    console.log(req.params);
    let sql = `SELECT movies.id, actors.actor, actors.id
    FROM actors_movie
    INNER JOIN actors ON actors_movie.actor_id = actors.id
    INNER JOIN movies ON actors_movie.movie_id = movies.id
    WHERE movies.id = ${id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const getGenres = ((req, res) => {
    let sql = `SELECT genre, id FROM genres WHERE genre NOT IN ('western', 'horror', 'musical','sport', 'war', 'film-noir', 'romance', 'music', 'history', 'family', 'biography')`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

module.exports = {
    getLastMovies,
    getMovies,
    getAdventureMovies,
    getActionMovies,
    getFantasticMovies,
    getHorrorMovies,
    getSciFiMovies,
    getComedyMovies,
    getDramaMovies,
    getMovie,
    getGenres,
    getMovieActor
}