const jwt=require('jsonwebtoken');

exports.AuthVerifyMiddleWare=(req,res,next)=>{

  let token=req.headers['token-key'];
  if(token){
    let Secret="123456789";
    jwt.verify(token,Secret,(err,decoded)=>{
      if(err){
        res.status(500).json({message:"unauthorized",data:err.message});
      }else{
        // send the full decoded data to the request object
        req.decoded=decoded;
        next();
      }
    })
  }else{
    res.status(501).json({message:"unauthorized",data:"invalid token"});
  }
}