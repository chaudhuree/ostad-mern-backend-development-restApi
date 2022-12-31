const express = require('express');
const { CreateProfile,UserLogin,SelectProfile,UpdateProfile } = require('../controllers/ProfileController');
const {AuthVerifyMiddleWare}=require('../middleware/AuthVerifyMiddleware');
const router=express.Router();
const { CreateToDo } = require('../controllers/TodoListController');

// user authentication routes
router.post("/CreateProfile",CreateProfile)
router.post("/UserLogin",UserLogin)
router.get("/SelectProfile",AuthVerifyMiddleWare,SelectProfile)
router.get("/UpdateProfile",AuthVerifyMiddleWare,UpdateProfile)


// todolist routes
router.post("/CreateToDo",AuthVerifyMiddleWare,CreateToDo)






module.exports = router;