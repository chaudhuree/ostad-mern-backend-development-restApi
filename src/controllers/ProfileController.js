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
        ProfileModel.updateOne({ UserName},{$set:{Token:token}},{upsert:true},(err,data)=>{
          if(err){
            res.status(500).json({ message: "failed in updating user data", data: err.message });
          }
          else{
            console.log(data)
          }
        }
          )


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
  const  decoded  = req.decoded;
  let userName = decoded.data.UserName;

  ProfileModel.findOne({ UserName: userName }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "user selection failed", data: err.message });
    } else {
      res.status(200).json({ message: "user selected successfully", data: data });
    }
  })
}
//docs: update profile
exports.UpdateProfile = (req, res) => {
  const  decoded  = req.decoded;
  let userName = decoded.data.UserName;

  let {FirstName}= req.body;
  console.log(userName,FirstName)

  ProfileModel.updateOne({ UserName: userName },{$set:{FirstName}},{upsert:true} ,(err, data) => {
    if (err) {
      res.status(500).json({ message: "update failed", data: err.message });
    } else {
      res.status(200).json({ message: "user's data updated", data: data });
    }
  })
}
