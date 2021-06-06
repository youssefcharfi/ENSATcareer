const { invalid } = require("@hapi/joi");
const User = require("../models/user")
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const sendEmail=require('../utils/sendEmail')
const Filiere =require("../models/filiere")

const { registerValidation , loginValidation}= require('../routes/validation');

exports.register= async(req,res)=>{  
const {name,email,password,filiere,niveau}=req.body;
// recherche l'id de filiere puisqu'on en recoit le nom dans le req 
fil=Filiere.findOne({filiere});
req.body.filiere=fil._id;
if(! name|| !email || !password || !filiere ||!niveau){
 return  res.status(404).json({msg:"Please fill all the required fields !"});
}
if(!validateEmail(email)){
  return res.status(404).json({msg:"Please enter a valid email"});
}
// validate before submiting 
const {error}=registerValidation(req.body);
if(error) { return res.status(400).send(error.details[0].message);}

console.log(req.body);


//password encryption 
const passwordhashed= await bcrypt.hash(password,12)
console.log({password,passwordhashed});
req.body.password=passwordhashed;
// create the user and save to the database 
const user=new User(req.body);
console.log(user.passowrd);
user.save();
sendToken(user,201,res);
res.json({msg:"Register Success ! Please activate your email to start."})

    }
 

exports.login= async (req,res,next)=>{
  try{  
  const {error}=loginValidation(req.body);
   if(error) { return res.status(400).send(error.details[0].message);}
   const {email,password}=req.body
   console.log(req.body);
   const user= await  User.findOne({email}).select("+password")
   if(!user) return res.status(404).json({error: "you need to sign in before logging in "})
   const hpass=user.password
   isMatch=await bcrypt.compare(password,hpass);
   if(!isMatch) return res.status(404).json({error: "incorrect password !!"});

   console.log("logged is succesfully ")
   sendToken(user,201,res);

  } catch(error){
    return res.status(404).json({error:error.message})
   } ;
}


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const createaActivationToken=(payload) =>{
  return jwt.sign(payload,process.env.ACTIVATION_TOKEN_SECRET,{expiresIn : '5m'})
  
}
const createaAccesToken=(payload) =>{
  return jwt.sign(payload,process.env.ACCES_TOKEN_SECRET,{expiresIn : '15m'})
  
}
const createRefreshToken=(payload) =>{
  return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn : '7d'})
  
}
const sendToken=async (user, statusCode, res ) => {
  const token= await user.getsignedToken()
  res.status(200).json({success:true,token})
}

exports.forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};
exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};