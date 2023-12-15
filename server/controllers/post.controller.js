const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

// fonction qui affiche tous les posts
module.exports.readPost = async (req, res) => {
    const posts = await PostModel.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json(posts);
};

//fonction qui affiche les détails d'un post

module.exports.postInfo = async (req, res) => {
    const postId = req.query.postId;
    try{
        const post = await PostModel.findById(postId);
        res.send(post);
    }
    catch (err) {
        return res.status(500).json({ 
            status : 500,
            message: " erreur du serveur.",
            details: err.toString() });
    }
}; 




// fonction qui crée un post

module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        userId: req.body.userId,
        userPseudo: req.body.pseudo,
        message: req.body.message,
        likers: [],
        comments: []
    })
    try {
        const post = await newPost.save();
        const user = await UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                $addToSet : {
                    myPosts : post._id
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true } 
        );
        
        return res.status(201).json({post});
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: " erreur du serveur.",
            details: err.toString()
        });
    };
};

// fonction qui M.A.J un post
module.exports.updatePost = async (req, res) => {
    if (!ObjectID.isValid(req.body.postId))
        return res.status(400).send('ID unkown : ' + req.body.postId);

    const updatedPost = await PostModel.findOneAndUpdate(
        { _id: req.body.postId }, //condition to find the post to update 
        {
            $set: {
                message: req.body.message
            }
        },
        { new: true, upsert: true, setDefaultsOnInsert: true } //options to return the updated post, param a mettre obligatoirement 
    );
    res.send(updatedPost);
};

// fonction qui supprime un post
module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.body.postId))
        return res.status(400).send('ID unkown : ' + req.body.postId);

    try {
        await PostModel.deleteOne({ _id: req.body.postId });
        res.status(200).json('Post successfuly deleted');
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            message: " erreur du serveur.",
            details: err.toString()
        });
    }
};


// fonction pour liker un post
module.exports.like = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToLike))
        return res.status(404).send('ID unkown : ' + req.params.id);

    try {
        // ajouter le post a la liste des likes du user
        const userWhoLike = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likes: req.body.idToLike }
            },
            { new: true, upsert: true }
        ).exec();

        // ajouter l'id du user qui like a la liste des likers du post
        const likedPost = await PostModel.findByIdAndUpdate(
            req.body.idToLike,
            {
                $addToSet: { likers: req.params.id }
            },
            { new: true, upsert: true }
        ).exec();

        return res.status(201).json({ userWhoLike, likedPost });
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            message: " erreur du serveur.",
            details: err.toString()
        });
    }
}

// fonction pour unliker un post
module.exports.like = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToLike))
        return res.status(404).send('ID unkown : ' + req.params.id);

    try {
        // ajouter le post a la liste des likes du user
        const userWhoLike = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likes: req.body.idToLike }
            },
            { new: true, upsert: true }
        ).exec();

        // ajouter l'id du user qui like a la liste des likers du post
        const likedPost = await PostModel.findByIdAndUpdate(
            req.body.idToLike,
            {
                $addToSet: { likers: req.params.id }
            },
            { new: true, upsert: true }
        ).exec();

        return res.status(201).json({ userWhoLike, likedPost });
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            message: " erreur du serveur.",
            details: err.toString()
        });
    }
}

module.exports.comment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).send('ID unkown : ' + req.params.id);
    try {
        const post = await PostModel.findOneAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterID: req.body.commenterID,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    }
                }
            },
            { new: true }
        );
        if (!post) {
            return res.status(404).send("Post introuvable");
        }
        return res.status(200).json('ok');
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            message: " erreur du serveur.",
            details: err.toString()
        });
    }
};

module.exports.updateComment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).send('ID unkown : ' + req.params.id);
    try {
        const post = await PostModel.findOneAndUpdate(
            { _id: req.params.id }, //condition to find the post to update 
            {
                $set: {
                    message: req.body.message
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true } //options to return the updated post, param a mettre obligatoirement 
        );
        res.send(post);
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            message: " erreur du serveur.",
            details: err.toString()
        });
    }
};

module.exports.deleteComment =  (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).send('ID unkown : ' + req.params.id);
    try {
        const comToDelete =  PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        id: req.body.commentId,
                    },
                },
            },
            { new : true},
        )
        //res.send(comToDelete);
        return res.status(200).json('comm successfuly deleted');
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            message: " erreur du serveur.",
            details: err.toString()
        });
    }
};