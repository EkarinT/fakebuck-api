const express = require('express');

const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');
const userController = require('../controllers/userController');

const router = express.Router();

router.patch(
  '/',
  authenticate,
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  userController.updateUser
);

module.exports = router;
