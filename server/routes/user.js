const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/auth")

const {
    register,
    login,
    getUserInfo,
    updateUser
} = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', checkToken, getUserInfo);
router.patch('/update', updateUser)

module.exports = router;