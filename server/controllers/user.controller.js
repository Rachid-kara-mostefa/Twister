const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

// fonction qui affiche tous les users
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

// fonction qui affiche les infos d'un user

module.exports.userInfo = async (req, res) => {
    const userId = req.query.userId;
    try{
        const user = await UserModel.findById(userId).select('-password')
        res.send(user);
    }
    catch (err) {
        return res.status(500).json({ 
            status : 500,
            message: " erreur du serveur.",
            details: err.toString() });
    }
}


module.exports.updateUser = async (req, res) => {
    console.log(req.params.id);
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            {_id: req.params.id}, //condition to find the user to update 
            {
                $set: {
                    bio: req.body.bio,
                    pseudo: req.body.pseudo,
                    email:  req.body.email,
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true} //options to return the updated user, param a mettre obligatoirement 
        );
        res.send(updatedUser);
    } catch(err) {
        console.log('ID inconnu : ' + err);
        return res.status(500).json({message : err});
    }
};
// fonction qui supprime un user
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unkown : ' + req.params.id);

    try {
        await UserModel.deleteOne({ _id: req.params.id });
        res.status(200).json('message : successfuly deleted');
    }
    catch (err) {
        return res.status(500).json({ 
            status : 500,
            message: " erreur du serveur.",
            details: err.toString() });
    }
}

// fonction pour gerer les abonnements
module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)) {
      return res.status(404).send('unknown ID : ' + req.params.id);
    }
  
    try {
      // Ajouter à la liste des followers
        const user = await UserModel.findByIdAndUpdate(
        req.params.id,
            { 
                $addToSet: { following: req.body.idToFollow }
            },
        { new: true, upsert: true }
        ).exec();
  
      // Ajouter à la liste des following
      const followedUser = await UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true }
      ).exec();
  
      return res.status(201).json({ user, followedUser });

      } catch (err) {
        return res.status(500).json({ 
            status : 500,
            message: " erreur du serveur.",
            details: err.toString() });
    }
};

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow)) {
        return res.status(404).send('unknown ID : ' + req.params.id);
    }
    
    try{
        // Retirer de la liste des followers
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow } },
            { new: true, upsert: true }
          ).exec();
      
          // Retirer de la liste des followings
          const unfollowedUser = await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true }
          ).exec();

          // 
          return res.json({ user, unfollowedUser });
    } 
    catch (err) {
        return res.status(500).json({ 
            status : 500,
            message: " erreur du serveur.",
            details: err.toString() });
    }
};