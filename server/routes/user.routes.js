const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require("../controllers/user.controller");

// AUTHENTIFICATION
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user affchages 
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/update',userController.updateUser);
router.delete('/delete',userController.deleteUser);
router.patch('/follow', userController.follow);
router.patch('/unfollow', userController.unfollow);

module.exports = router;