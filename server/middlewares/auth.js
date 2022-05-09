const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
    console.log(req.header);
    const token = req.header('token');
    console.log(token);
    if (!token) {
        return res.send({error: 'not login'})
    }
    try {
        const goodToken = verify(token, 'mysecretToken');
        req.id = goodToken
        if (goodToken) {
            next();
        }
    }
    catch (err) {
        return res.send({error: err})
    }
}

module.exports = {checkToken};