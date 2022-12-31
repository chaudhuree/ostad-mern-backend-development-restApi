const jwt=require('jsonwebtoken');

exports.AuthVerifyMiddleWare=(req,res,next)=>{
// while requesting to this path in the postman request header this
// token-key should be present
  let token=req.headers['token-key'];
  if(token){
    let Secret="123456789";
    jwt.verify(token,Secret,(err,decoded)=>{
      if(err){
        res.status(500).json({message:"unauthorized",data:err.message});
      }else{
        // send the full decoded data to the request object
        req.decoded=decoded;
        // set req.headers.email to the decoded email
        req.headers.email=decoded['data']['Email']
        next();
      }
    })
  }else{
    res.status(501).json({message:"unauthorized",data:"invalid token"});
  }
}