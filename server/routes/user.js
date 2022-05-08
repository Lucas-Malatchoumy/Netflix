const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/auth")

const {
    register,
    login,
    getUserInfo
} = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', checkToken, getUserInfo)

module.exports = router;