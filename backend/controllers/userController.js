import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../util/generateToken.js';


// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
export const authUser = asyncHandler(async (req,res) => {
    const{email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error('All fields required!')
    
    }

    const user = await User.findOne({email});

    if(user && ( await user.matchPassword(password))){
       
        generateToken(res, user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            
        })
    }else{
        res.status(400);
        throw new Error('Invalid email or password')
    }

});

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public
export const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('All field are requires!');
    }

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error('email is already used')
    };

    const user = await User.create({name, email, password});

    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            
        })
    }else{
        res.status(400);
        throw new Error('Invalid user Data')
    }


});

// @desc    logout user
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req,res) => {

 res.cookie('jwt', '' , {
    httpOnly:true,
    expires: new Date(0)

 });
        res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    get user profile
// @route   Get /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req,res) => {
    const user = {

        _id: req.user._id,
        name:req.user.name,
        email:req.user.email
        
    }

    res.status(200).json({user})
});


// @desc    get user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req,res) => {
    const{name, email} = req.body
   const user = await User.findById(req.user.id);
   if(user){
    user.name = name,
    user.email = email
   }

   if(req.body.password){
    user.password = req.body.password;
   }

   const data = await user.save()

   res.status(202).json(data)

  
});



