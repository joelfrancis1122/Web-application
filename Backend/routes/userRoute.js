const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { userController } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth')
router.post('/register', userController.register);

router.post('/login', userController.login);
router.post('/upload',authMiddleware,upload.array('profilePic'), userController.updateProfilePictures);


module.exports = router;