const express = require('express');
const { CreateProfile,UserLogin,SelectProfile,UpdateProfile } = require('../controllers/ProfileController');
const {AuthVerifyMiddleWare}=require('../middleware/AuthVerifyMiddleware');
const router=express.Router();


router.post("/CreateProfile",CreateProfile)
router.post("/UserLogin",UserLogin)
router.get("/SelectProfile",AuthVerifyMiddleWare,SelectProfile)
router.get("/UpdateProfile",AuthVerifyMiddleWare,UpdateProfile)






module.exports = router;