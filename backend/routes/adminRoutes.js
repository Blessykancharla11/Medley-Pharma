const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.post('/signup', AdminController.registerAdmin);
router.post('/login', AdminController.authAdmin);

module.exports = router;
