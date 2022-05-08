const db = require('../config');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken")

const register = ((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const city = req.body.city;
    const address = req.body.address;
    const zipCode = req.body.zipCode;
    const profile = req.body.profile;
    let sql = `SELECT * FROM users WHERE email = '${email}';`;
    db.query(sql, (err, result) => {
      if (result.length >= 1) {
        console.log(result);
        return res.send({message: 'This user already exist'});
      }
      else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.send({message: error});
          } 
          else {
            sql = "INSERT INTO users (firstName, lastName, email, password, adress, city, zipCode, profile) VALUES (?,?,?,?,?,?,?,?)";
            db.query(sql, [firstName, lastName, email, hash, address, city, zipCode, profile], (err, result) => {
              if (err) {
                console.log(err);
              }
              else {
                const token = sign({id: result.insertId, email: email}, 'mysecretToken');
                //res.send({message: 'The user has been registered'});
                res.send(result);
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
            throw err;
            }
        if (!result.length) {
            return res.send({
                error: 'User dont exist'
            });
        }
        bcrypt.compare(password, result[0].password, (err, check) => {
            if (check === false) {
                return res.send({
                    error: 'Email or password is incorrect!'
                });
            }
            else {
              console.log(result[0].id);
                const token = sign({id: result[0].id, email: email}, 'mysecretToken');
                console.log(token);
                res.send(token);
            }
        })
    })
});

const getUserInfo = ((req, res) => {
  const id = req.id.id;
  let sql = `SELECT * FROM users WHERE id = '${id}';`;
    db.query(sql, (err, result) => {
        if (err) {
          res.send({
            error: 'nope'
          })
        }
        else {
          res.send(result);
        }
    })
})

const updateUser = ((req, res) => {
  const id = req.id.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;
  const address = req.body.address;
  const zipCode = req.body.zipCode;
  const profile = req.body.profile;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.send({message: error});
    } 
    else {
      sql = `UPDATE users SET firstName = ${firstName}, lastName = ${lastName}, email = ${email}, password = ${password}, adress = ${address}, city = ${city}, zipCode = ${zipCode}, profile = ${profile}) WHERE id = ${id}`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          res.send(result);
        }
      });
    }
  })
})

module.exports = {
    register,
    login,
    getUserInfo
}