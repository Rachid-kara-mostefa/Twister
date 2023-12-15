const UserModel = require('../models/user.model');
const { signUpErrors,signInErrors }  = require('../utils/errors.utils');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60 * 1000;   // 3 days
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, { expiresIn: maxAge} )
};

module.exports.signUp = async(req, res) => {

    const {pseudo, email, password} = req.body;

    try {
        //const user = await UserModel.create({pseudo : username, email : email, password : password});
        const user = await UserModel.create({pseudo, email,password});

        res.status(201).json({user : user._id});
       /// console.log("user created",user);
    } catch (error) {
        const errors = signUpErrors(error);
        //res.status(500).json(error);
        res.status(500).send({ errors })
    }
}

module.exports.signIn = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.login(email, password);
        //console.log("id",user._id);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge });
        res.status(200).json({user : user._id});
        //res.status(200).json({user : user.pseudo});
    } catch (error) {
        const errors = signInErrors(error);
        res.status(500).json({ errors })
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('jwt'); // supprimer le cookie jwt en le mettant à une durée de vie nulle
    res.status(200).json({ success: true, message: "Deconnexion réussie" }); // envoyer une réponse JSON avec un message de succès
    //res.redirect('/'); // rediriger l'utilisateur vers la page d'accueil
}
  