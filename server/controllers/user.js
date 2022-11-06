const db = require('../config');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken")

const register = ((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const city = req.body.city;
    const adress = req.body.adress;
    const zipCode = req.body.zipCode;
    const profile = req.body.profile;
    let sql = `SELECT * FROM users WHERE email = '${email}';`;
    db.query(sql, (err, result) => {
      if (result.length >= 1) {
        console.log(result);
        return res.status(404).json({error: 'This user already exist'});
      }
      else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.json({message: error});
          } 
          else {
            sql = "INSERT INTO users (firstName, lastName, email, password, adress, city, zipCode, profile) VALUES (?,?,?,?,?,?,?,?)";
            db.query(sql, [firstName, lastName, email, hash, adress, city, zipCode, profile], (err, result1) => {
              if (err) {
                console.log(err);
                return res.json({error: 'some values are incorrect'});
              }
              else {
                let id = result1.insertId;
                let sql = `SELECT * FROM users WHERE id = '${id}';`;
                db.query(sql, (err, result) => {
                    if (err) {
                      res.json({
                        error: 'nopessss'
                      })
                    }
                    else {
                      const token = sign({id: result1.insertId, email: email}, 'mysecretToken');
                      const message = 'The user has been registered';
                      const body = result[0];
                      res.status(201).json({body, token, message});
                      
                    }
                });
              }
            });
          }
        })
      }
    })
});

const login = ((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let sql = `SELECT * FROM users WHERE email = '${email}';`;
    db.query(sql, (err, result) => {
        if (err) {
          return res.send({
            error: 'problrm'
        });
            }
        if (!result.length) {
            return res.json({
                error: "User doesn't exist"
            });
        }
        bcrypt.compare(password, result[0].password, (err, check) => {
            if (check === false) {
                return res.json({
                    error: 'Password is incorrect!'
                });
            }
            else {
              console.log(result[0].id);
                const token = sign({id: result[0].id, email: email, roleId: result[0].roleId}, 'mysecretToken');
                res.status(200).json({token});
            }
        })
    })
});

const getUserInfo = ((req, res) => {
  const id = req.id.id;
  let sql = `SELECT * FROM users WHERE id = '${id}';`;
    db.query(sql, (err, result) => {
        if (err) {
          res.status(405).json({error: 'nopessss'})
        }
        else {
          console.log(result);
          res.send(result);
        }
    })
});

const deleteUser = ((req, res) => {
  const id = req.id.id;
  let sql = `SELECT * FROM users WHERE id = '${id}';`;
    db.query(sql, (err, result1) => {
        if (err) {
          res.status(405).json({error: 'nopessss'})
        }
        else {
          let sql = `DELETE FROM users WHERE id = '${id}';`;
          db.query(sql, (err, result2) => {
              if (err) {
                res.status(405).json({error: "user doesn't exist"})
              }
              else {
                const result = result1[0];
                console.log(result);
                const message = "user has been deleted"
                res.status(200).json({result, message})
              }
          })
        }
    }) 
});

const updateUser = ((req, res) => {
  const id = req.id.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  var password = req.body.password;
  const city = req.body.city;
  const address = req.body.address;
  const zipCode = req.body.zipCode;
  const profile = req.body.profile;
  if (password) {
    bcrypt.hash(password, 10, (err, hash) => {
      password == hash;
    });
  };
  sql = `UPDATE users SET firstName = IF('${firstName}' = '', firstNAme, '${firstName}'), lastName = IF('${lastName}' = '', lastName, '${lastName}'), email = IF('${email}' = '', email,
    '${email}'), password = IF('${password}' = '', password, '${password}'), adress = IF('${address}' = '', adress, '${address}'), city = IF('${city}' = '', city, '${city}'), zipCode = IF('${zipCode}' = '', zipCode, '${zipCode}'), profile = IF('${profile}' = '', profile, '${profile}') WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      let sql = `SELECT * FROM users WHERE id = '${id}';`;
      db.query(sql, (err, result) => {
        if (err) {
          res.status(405).json({error: 'nopessss'})
        }
        else {
          const message = "user has been updated"
          const body = result[0];
          res.status(200).json({body, message});
        }      
    })
    }
  });
})

const addToFavs = ((req, res) => {
  console.log(req.params);
  const movieId = req.params.movie;
  const userId = req.id.id;
  let sql = `SELECT * FROM users_favs_movies WHERE user_id = '${userId}' AND movie_id = '${movieId}'`
  db.query(sql, (err, result) => {
      if (!result.length) {
        sql = `INSERT INTO users_favs_movies (user_id, movie_id, currentDate) VALUES ('${userId}', '${movieId}', NOW()) ON DUPLICATE KEY UPDATE user_id = user_id, movie_id = movie_id, id = id; `;
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          }
          else {
            let sql = `SELECT * FROM movies WHERE id = '${movieId}' `;
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                  const movie = result[0];
                  const message = `The movie ${movie.title} are in your favs !`;
                  res.status(200).json({movie, message});
                }
            });
          }
        })
      }
  })
});
const countFavs = ((req, res) => {
  const userId = req.params.user;
  let sql = `SELECT COUNT(movie_id) AS 'nb' FROM users_favs_movies WHERE user_id = '${userId}'`;
  db.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      else {
          res.send(result);
      }
  })
});

const getFavs = ((req, res) => {
  const id = req.params.user;
  console.log(id);
  let sql = `SELECT movies.title, movies.image, movies.id
  FROM users_favs_movies
  INNER JOIN users ON users_favs_movies.user_id = users.id
  INNER JOIN movies ON users_favs_movies.movie_id = movies.id
  WHERE users.id = '${id}'`;
  db.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      else {
          console.log(result[0]);
          res.json(result);
      }
  })
});

const getFiveFavs = ((req, res) => {
  const id = req.params.user;
  console.log(id);
  let sql = `SELECT DISTINCT movies.title, movies.image, movies.id, users_favs_movies.currentDate
  FROM users_favs_movies
  INNER JOIN users ON users_favs_movies.user_id = users.id
  INNER JOIN movies ON users_favs_movies.movie_id = movies.id
  WHERE users.id = '${id}' ORDER BY users_favs_movies.currentDate DESC LIMIT 5`;
  db.query(sql, (err, result) => {
      if (err) {
          console.log(err);
      }
      else {
          res.json(result);
      }
  })
});

const addView = ((req, res) => {
  console.log(req.params);
  const movieId = req.params.movie;
  const userId = req.id.id;
  let sql = `SELECT * FROM movie_views WHERE movie_id = '${movieId}' AND user_id = '${userId}'`;
  db.query(sql, (err, result) => {
      if (result.length) {
          sql = `UPDATE movie_views SET nb_views = nb_views + 1 WHERE movie_id = '${movieId}' AND user_id = '${userId}' `;
          db.query(sql, (err, result) => {
            if (err) {
              console.log(err);
            }
            else {
              let sql = `SELECT SUM(movie_id) AS 'nb' FROM movie_views WHERE movie_id = '${movieId}';`;
              db.query(sql, (err, result) => {
                console.log(result);
                  if (err) {
                    res.send({
                      error: 'nope'
                    })
                  }
                  else {
                    res.send(result[0]);
                  }
              });
            };
          });
      }
      else {
        sql = `INSERT INTO movie_views (movie_id, user_id, nb_views) VALUES ('${movieId}', '${userId}', 1) `;
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          }
          else {
            let sql = `SELECT SUM(movie_id) AS 'nb' FROM movie_views WHERE movie_id = '${movieId}';`;
              db.query(sql, (err, result) => {
                console.log(result);
                  if (err) {
                    res.send({
                      error: 'nope'
                    })
                  }
                  else {
                    res.send(result[0]);
                  }
              });
          }
        });
      }
  })
});

const getNbView = ((req, res) => {
  const userId = req.params.user;
  let sql = `SELECT COUNT(user_id) AS 'nb' FROM movie_views WHERE user_id = '${userId}';`;
    db.query(sql, (err, result) => {
      console.log(result);
        if (err) {
          res.send({
            error: 'nope'
          })
        }
        else {
          res.send(result[0]);
        }
    })
});


module.exports = {
    register,
    login,
    getUserInfo,
    updateUser,
    addToFavs,
    getFavs,
    addView,
    getNbView,
    getFiveFavs,
    countFavs,
    deleteUser
}