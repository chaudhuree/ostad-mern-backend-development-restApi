const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
  FirstName:{type:String},
  LastName:{type:String},
  Email:{type:String,required:true},
  MobileNumber:{type:String},
  City:{type:String},
  UserName:{type:String,required:true,unique:true},
  Password:{type:String,required:true},
},{versionKey:false});

ProfileModel=mongoose.model('Profiles',DataSchema);
module.exports=ProfileModel