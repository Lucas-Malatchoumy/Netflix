const db = require('../config');


const getLastMovies = ((req, res) => {
    let sql = `SELECT title, image, id FROM movies ORDER BY currentDate DESC LIMIT 5`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

// const getActionMovies = ((req, res) => {
//     let sql = `SELECT movies.image, movies.id genres.genre, movies.title
//     FROM genre_movie
//     INNER JOIN genres ON genre_movie.genre_id = genres.id
//     INNER JOIN movies ON genre_movie.movie_id = movies.id
//     WHERE genre = 'Action' ORDER BY RAND () LIMIT 10 ;`;
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// });

// const getHorrorMovies = ((req, res) => {
//     let sql = `SELECT movies.image, movies.id genres.genre, movies.title
//     FROM genre_movie
//     INNER JOIN genres ON genre_movie.genre_id = genres.id
//     INNER JOIN movies ON genre_movie.movie_id = movies.id
//     WHERE genre = 'Horror' ORDER BY RAND () LIMIT 10 ;`;
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// });

// const getFantasticMovies = ((req, res) => {
//     let sql = `SELECT movies.image, movies.id genres.genre, movies.title
//     FROM genre_movie
//     INNER JOIN genres ON genre_movie.genre_id = genres.id
//     INNER JOIN movies ON genre_movie.movie_id = movies.id
//     WHERE genre = 'Fantasy' ORDER BY RAND () LIMIT 10 ;`;
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// });

// const getSciFiMovies = ((req, res) => {
//     let sql = `SELECT movies.image, movies.id genres.genre, movies.title
//     FROM genre_movie
//     INNER JOIN genres ON genre_movie.genre_id = genres.id
//     INNER JOIN movies ON genre_movie.movie_id = movies.id
//     WHERE genre = 'Sci-Fi' ORDER BY RAND () LIMIT 10 ;`;
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// });

// const getDramaMovies = ((req, res) => {
//     let sql = `SELECT movies.image, movies.id genres.genre, movies.title
//     FROM genre_movie
//     INNER JOIN genres ON genre_movie.genre_id = genres.id
//     INNER JOIN movies ON genre_movie.movie_id = movies.id
//     WHERE genre = 'Drama' ORDER BY RAND () LIMIT 10 ;`;
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// });

// const getComedyMovies = ((req, res) => {
//     let sql = `SELECT movies.image, movies.id genres.genre, movies.title
//     FROM genre_movie
//     INNER JOIN genres ON genre_movie.genre_id = genres.id
//     INNER JOIN movies ON genre_movie.movie_id = movies.id
//     WHERE genre = 'Comedy' ORDER BY RAND () LIMIT 10 ;`;
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// });

const getMovie = ((req, res) => {
    const id = req.params.movie;
    const user_id = req.id.id
    let sql = `SELECT id FROM users_favs_movies WHERE user_id = '${user_id}' AND movie_id = ${id}`;
    db.query(sql, (err, result) => {
        sql = `SELECT * FROM movies WHERE id = '${id}' `;
        db.query(sql, (err, result2) => {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length) {
                    const isFav = true;
                    const movie = result2[0];
                    res.send({movie, isFav});
                }
                else {
                    const isFav = false;
                    const movie = result2[0];
                    res.send({movie, isFav});
                }
            }
        });
    });
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
            res.status(200).json(result);
        }
    })
});

const getmostViewed = ((req, res) => {
    let sql = `SELECT movies.id, movies.image, movies.title, movie_views.nb_views
    FROM movie_views
    INNER JOIN movies ON movie_views.movie_id = movies.id
    ORDER BY movie_views.nb_views DESC LIMIT 10`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const search = ((req, res) => {
    const data = req.params.search;
    console.log(data);
    let sql = `SELECT DISTINCT movies.id, movies.image, movies.id, movies.title
    FROM genre_movie
    INNER JOIN genres ON genre_movie.genre_id = genres.id
    INNER JOIN movies ON genre_movie.movie_id = movies.id
    WHERE movies.title LIKE '%${data}%' OR  genres.genre = '${data}';`;
      db.query(sql, (err, result) => {
          if (err) {
            res.send({
              error: 'nope'
            })
          }
          else {
              console.log(result);
            res.send(result);
          }
      })
  });

module.exports = {
    getLastMovies,
    getMovies,
    getmostViewed,
    getMovie,
    getGenres,
    getMovieActor,
    search,
}