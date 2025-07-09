import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
// import bcrypt from 'bcryptjs';

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Double hitted")
    
    // Find user by email (case insensitive)
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {

      // Generate token and send response
      const token = generateToken(user._id); //
      res.json({
        token,   //
        user:{
              success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
        }

        //   success: true,
        // _id: user._id,
        // name: user.name,
        // email: user.email,
        // isAdmin: user.isAdmin,
        // token: generateToken(user._id)
        
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("hitted")
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Format email to lowercase for consistency
    const formattedEmail = email.toLowerCase();
    
    // Check if user already exists (case insensitive)
    const userExists = await User.findOne({ email: formattedEmail });

    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user - the password will be hashed in the userModel pre-save hook
    const user = await User.create({
      name,
      email: formattedEmail,
      password, // Password will be hashed by the pre-save hook in userModel.js
    });

    if (user) {
      // Return user data with token
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        user // Include user data for the frontend
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error during registration', 
      error: error.message 
    });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    // req.user should come from the auth middleware
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authorized, no token or invalid token' });
    }
    
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};