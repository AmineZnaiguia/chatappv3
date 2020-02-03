const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const gravatar = require('gravatar');
const {check, validationResult} = require('express-validator');

 const User = require('../models/User');
const secretKey = config.get('secretKey');

const Router = express.Router();

// @route POST user
// @desc  register user
Router.post('/register',[
  check('login', 'login is required').notEmpty(),
  check('email', 'please enter a valid email').isEmail(),
  check('password', 'please enter a password with 6 or more char'
  ).isLength({min: 6})
], 
  async (req, res)=>{
  const errors = validationResult(req
  );
   if(!errors.isEmpty()){
     return res.status(400).json({errors: errors.array()})
   }

   const { login, email, password } = req.body;
   try {
      // see if user exists
     let user = await User.findOne({email});
     if(user){
       return res.status(400).json({errors:[{msg: 'user already exist'}]});
     }
     
  // get users gravatar
   const avatar = gravatar.url(email, {
     s: '200',
     r: 'pg',
     d: 'mm'
   })

   user = new User({
     login,
     email,
     avatar,
     password
   })
  // encrypt password
   
  const salt = await bcrypt.genSalt(10);
  
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  // return jwt
    const payload = {
      user : {
        id: user.id
      }
    }
    jwt.sign(payload,secretKey,
      (err, token)=>{
        if(err) throw err;
        res.json({token})
      }
      );

   } catch (err) {
     console.log(err.message);
     res.status(500).send('server error')
   }

 



  
})

module.exports = Router;