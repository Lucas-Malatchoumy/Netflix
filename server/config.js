const mysql = require("mysql2");
const movies = require('./db.json');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "testMysql",
    database: "Netflix"
});

movies.forEach((element) => {
    element.actors = element.actors.split(', ');
});
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    db.query("CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY UNIQUE, firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, adress VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, zipCode INT NOT NULL, profile VARCHAR(255) NOT NULL, CHECK (email LIKE '%@%' and email LIKE '%_@_%') ) ", function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
    db.query("CREATE TABLE IF NOT EXISTS users_favs_movies ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY UNIQUE, user_id INT NOT NULL, movie_id INT NOT NULL, FOREIGN KEY (movie_id) REFERENCES movies(id), FOREIGN KEY (user_id) REFERENCES users(id)) ", function (err, result) {
      if (err) throw err;
      console.log("Table users_fas_movies created");
    });
    
    db.query("CREATE TABLE IF NOT EXISTS movies ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY UNIQUE, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, image VARCHAR(255) NOT NULL, year YEAR NOT NULL, duration INT NOT NULL, currentDate DATETIME NOT NULL, parental_rating INT NOT NULL )", function (err, result) {
      if (err) throw err;
      console.log("Table movies created");
    });

    db.query("CREATE TABLE IF NOT EXISTS genres ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY UNIQUE, genre VARCHAR(255) NOT NULL UNIQUE)", function (err, result) {
      if (err) throw err;
      console.log("Table genre created");
    });

    db.query("CREATE TABLE IF NOT EXISTS actors ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY UNIQUE, actor VARCHAR(255) NOT NULL UNIQUE)", function (err, result) {
        if (err) throw err;
        console.log("Table actors created");
      });

    db.query("CREATE TABLE IF NOT EXISTS genre_movie ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY UNIQUE, movie_id INT NOT NULL, genre_id INT NOT NULL, FOREIGN KEY (movie_id) REFERENCES movies(id), FOREIGN KEY (genre_id) REFERENCES genres(id))", function (err, result) {
      if (err) throw err;
      console.log("Table genre_movie created");
    });

    db.query("CREATE TABLE IF NOT EXISTS actors_movie ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY UNIQUE, movie_id INT NOT NULL, actor_id INT NOT NULL, FOREIGN KEY (movie_id) REFERENCES movies(id), FOREIGN KEY (actor_id) REFERENCES actors(id))", function (err, result) {
        if (err) throw err;
        console.log("Table actors_movie created");
      });
      
    const genres  = require('./genres.json');

    const parental_ratings = [10, 12, 16, 18];
    movies.forEach((element, i) => {
      setTimeout( () => {
          let sql = `INSERT INTO movies (id, title, description, image, year, duration, currentDate, parental_rating) VALUES (?,?,?,?,?,?,NOW(),?) ON DUPLICATE KEY UPDATE id = id;`
          let parental_rating = parental_ratings[Math.floor(Math.random()*parental_ratings.length)];
          db.query(sql, [element.id, element.title, element.plot, element.posterUrl, element.year, element.runtime, parental_rating], (err, result) => {
            if (err) {
              console.log(err)
            }
            else {
                let movie_id;
                let sql = `SELECT id FROM movies WHERE id = '${element.id}' `;
                db.query(sql, (err, result) => {
                    if (err) {
                    console.log(err)
                    }
                    else {
                        result.forEach(element => movie_id = element.id);
                        sql = `INSERT INTO genres (genre) VALUES (?) ON DUPLICATE KEY UPDATE genre = genre, id = id;`;
                        element.genres.forEach((genre) => {
                            db.query(sql, genre, (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                              //console.log(result);
                            }
                            })
                        });
                        sql = `INSERT INTO actors (actor) VALUES (?) ON DUPLICATE KEY UPDATE actor = actor, id = id;`;
                        element.actors.forEach((actor) => {
                          db.query(sql, actor, (err, result) => {
                            if (err) {
                              console.log(err)
                          }
                          else {
                            //console.log(result);
                          }
                          })
                        })
                    }
                })
            }
          });
        }, i * 1000);
    })
  });

module.exports = db;