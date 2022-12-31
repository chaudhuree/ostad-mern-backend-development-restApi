const ProfileModel = require('../models/ProfileModel');
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

exports.UserLogin = (req, res) => {
  let { UserName, Password } = req.body;
  res.status(200).json({
    message: "user login successfully", data: {
      UserName,
      Password
    }
  });
  Profile
}