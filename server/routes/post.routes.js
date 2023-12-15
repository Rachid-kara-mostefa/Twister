const router = require('express').Router();
const postController = require('../controllers/post.controller');

// posts affichages
router.get('/', postController.readPost);
router.get('/:id', postController.postInfo);
router.post('/', postController.createPost);
router.put('/update_post', postController.updatePost);
router.delete('/delete_post', postController.deletePost);
router.patch('/like/:id', postController.like);
//router.patch('/unlike/:id', postController.unlike);

//router.patch('/comment/:id', postController.comment);
//router.patch('/updateComment/:id', postController.updateComment);
//router.patch('/deleteComment/:id', postController.deleteComment);

module.exports = router ;