const jwt = require('jsonwebtoken');
const ProfileModel = require('../models/ProfileModel');

// docs: create user
exports.CreateProfile = (req, res) => {
  let reqBody = req.body;
  ProfileModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(500).json({ message: "user creation failed", data: err.message });
    } else {
      res.status(200).json({ message: "user created successfully", data: data });
    }
  });
}

// docs:login user
exports.UserLogin = (req, res) => {
  // let userName = req.body['UserName'];
  // let password = req.body['Password'];
  let { UserName, Password } = req.body;

  // res.status(200).json({
  //   message: "user login successfully", data: {
  //     UserName,
  //     Password
  //   }
  // });

  ProfileModel.findOne({ UserName: UserName, Password: Password }, (err, data) => {

    if (err) {
      res.status(500).json({ message: "user login failed", data: err.message });
    } else {
      if (data) {
        let Payload = { exp: Math.floor(Date.now() / 1000) + (60 * 60), data: data }
        // secret token key generated from jwt
        let Secret = "123456789"
        let token = jwt.sign(Payload, Secret)
        
        res.status(200).json({ message: "user login successfully", data: data, token });
      }
      else {
        res.status(501).json({ message: "unauthorized", data: "invalid credentials" });
      }
    }
  })
  // ProfileModel.findOne({ UserName: userName, Password: password }, (err, data) => {

  //   if (err) {
  //     res.status(500).json({ message: "user login failed", data: err.message });
  //   } else {
  //     if (data) {
  //       let Payload = { exp: Math.floor(Date.now() / 1000) + (60 * 60), data: data }
  //       let Secret = "123456789"
  //       let token = jwt.sign(Payload, Secret)
  //       res.status(200).json({ message: "user login successfully", data: data, token });
  //     }
  //     else {
  //       res.status(501).json({ message: "unauthorized", data: "invalid credentials" });
  //     }
  //   }
  // })
}



// docs: getProfile 
exports.SelectProfile = (req, res) => {
  const { decoded } = req;
  let userName = decoded.data.UserName;

  ProfileModel.findOne({ UserName: userName }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "user selection failed", data: err.message });
    } else {
      res.status(200).json({ message: "user selected successfully", data: data });
    }
  })
}
