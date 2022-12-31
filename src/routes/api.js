const express = require('express');
const { CreateProfile } = require('../controllers/ProfileController');
const router=express.Router();


router.get("/CreateProfile",CreateProfile)








module.exports = router;