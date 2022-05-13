const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/auth")

const {
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
} = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', checkToken, getUserInfo);
router.patch('/update', checkToken, updateUser)
router.get('/addToFavs/:movie',checkToken, addToFavs)
router.get('/getFavs/:user',getFavs);
router.get('/getFiveFavs/:user',getFiveFavs)
router.get('/countFavs/:user', countFavs);
router.get('/addView/:movie', checkToken, addView);
router.get('/nbView/:user', getNbView);
router.delete('/delete', checkToken, deleteUser)



module.exports = router;