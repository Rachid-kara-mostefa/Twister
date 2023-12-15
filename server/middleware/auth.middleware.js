
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                // res.clearCookie('jwt');
                next();
            } else {
                console.log('decoded token.id ' + decodedToken.id);
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);
                res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                // res.send(200).json('no token')
                res.status(401).json('no token')
            } else {
                console.log('decoded token.id ' + decodedToken.id);
                next();
            }
        });
    } else {
        console.log('No token'); 
    }
}