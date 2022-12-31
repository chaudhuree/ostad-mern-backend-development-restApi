const express = require('express');
const router = express.Router();
const { CreateProfile, UserLogin, SelectProfile, UpdateProfile } = require('../controllers/ProfileController');
const { AuthVerifyMiddleWare } = require('../middleware/AuthVerifyMiddleware');

const { CreateToDo, SelectToDo,UpdateToDo } = require('../controllers/TodoListController');

  // user authentication routes
  router.post("/CreateProfile", CreateProfile)
  router.post("/UserLogin", UserLogin)
  router.get("/SelectProfile", AuthVerifyMiddleWare, SelectProfile)
  router.get("/UpdateProfile", AuthVerifyMiddleWare, UpdateProfile)


  // todolist routes
  router.post("/CreateToDo", AuthVerifyMiddleWare, CreateToDo)
  router.get("/SelectToDo", AuthVerifyMiddleWare, SelectToDo)
  router.post("/UpdateToDo", AuthVerifyMiddleWare, UpdateToDo)






  module.exports = router;