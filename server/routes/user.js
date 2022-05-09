const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/auth")

const {
    register,
    login,
    getUserInfo,
    updateUser,
    addToFavs,
    getFavs
} = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', checkToken, getUserInfo);
router.patch('/update', updateUser)
router.get('/addToFavs/:movie',checkToken, addToFavs)
router.get('/getFavs/:user',getFavs)

module.exports = router;