const express = require('express');
const { check, validationResult } = require('express-validator')

const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User')

const Router = express.Router();

// @route   GET profile
// @desc    Get current users profile
// @access  Private
Router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate(
            'user',['login', 'avatar']);

            if(!profile){
                return res.status(400).json({msg: 'there is no profile for this user'})
            }

            res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
  
  }
);

// @route   post profile
// @desc    create update profile
// @access  Private
Router.post('/', [auth,[
    check('status', 'status is required').notEmpty(),
    check('skills', 'skills is required').notEmpty()
]],
async (req,res)=>{
 const errors = validationResult(req);
 if(!errors.isEmpty()) {
     return res.status(400).json({errors: errors.array()})
 }
const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
} = req.body;
 // build profile object

 const profileFields = {};
 profileFields.user = req.user.id;
 if (company) profileFields.company = company;
 if (website) profileFields.website = website;
 if (location) profileFields.location = location;
 if (bio) profileFields.bio = bio;
 if (status) profileFields.status = status;
 if (githubusername) profileFields.githubusername = githubusername;
 if (skills){
     profileFields.skills = skills.split(',').map(skill => skill.trim())
 }

//build social object
profileFields.social = {}
if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;


try {
   let profile = await Profile.findOne({ user : req.user.id});

   if(profile){
       //update
       profile = await Profile.findOneAndUpdate(
           {user: req.user.id},
           { $set : profileFields},
           {new : true}
       );

       return res.json(profile)
   }

   // create
   profile = new Profile(profileFields);

   await profile.save();
   res.json(profile);

} catch (err) {
    console.error(err.message );
    res.status(500).send('server error');
};
});


// @route   GET profile
// @desc    Get all profiles
// @access  public

Router.get('/', async (req, res)=>{
    try {
        const profiles = await Profile.find().populate('user', ['login', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
})

// @route   GET profile
// @desc    Get by userId
// @access  public

Router.get('/user/:user_id', async (req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['login', 'avatar']);
        
        if(!profile)
        return res.status(400).json({msg: 'profile not found'})
        
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'profile not found'})  
        }
        res.status(500).send('server error')
    }
})


// @route   delete profile
// @desc    delete profile user
// @access  private

Router.delete('/',auth, async (req, res)=>{
    try {
        // remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        // remove user
        await User.findOneAndRemove({_id: req.user.id});
        res.json({msg: 'User removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
})

module.exports = Router;