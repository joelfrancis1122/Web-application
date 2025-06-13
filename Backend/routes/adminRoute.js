const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { adminController } = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth')
router.get('/dashboard',authMiddleware,adminController.getAllUsers);
router.get('/user',adminController.getUserByQuery);


router.put('/user', adminController.updateUserByQuery);
router.delete('/user', adminController.deleteUserByQuery);
router.post('/user', upload.array('profilePic'), adminController.createUser);

module.exports = router;
