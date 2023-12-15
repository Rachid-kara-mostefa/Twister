const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        userPseudo: {
            type: String,
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500
        },
        picture: {
            type: String,
        },
        likers: {
            type: [String],
            required: true
        },
        comments: {
            /*type: [
                {
                    commenteurId: String,
                    commenteurPseudo: String,
                    texte: String,
                    timestamps: Number
                }
            ]*/
            type: [String],
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', PostSchema);