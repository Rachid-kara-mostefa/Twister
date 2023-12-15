const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config({path: './config/.env'})
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // autoriser les requêtes de ce domaine
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Access-Control-Allow-Origin','Content-Type', 'Authorization'] // autoriser ces en-têtes
}));



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));    
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req,res) => {
    // callback
    res.status(200).send(res.locals.user._id)
});

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);




//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})

