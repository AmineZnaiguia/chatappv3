const express = require('express');
const Router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const secretKey = config.get('secretKey');
const User = require('../models/User')

Router.get('/', auth, async (req, res)=>{
    try {
     const user = await User.findById(req.user.id).select('-password');
     res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
}
)

// @desc  auth user 
//  authenticate and get user

Router.post('/',[
  
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'password is required'
    ).exists()
  ], 
    async (req, res)=>{
    const errors = validationResult(req
    );
     if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
     }
  
     const { email, password } = req.body;
     try {
        // see if user exists
       let user = await User.findOne({email});
       if(!user){
         return res.status(400).json({errors:[{msg: 'Invalid credentials'}]});
       }
       
    
     const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({errors:[{msg: 'Invalid credentials'}]});
    }
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