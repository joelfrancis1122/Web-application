const jwt = require('jsonwebtoken');
const User = require('../model/userModel');


const userController = {
  register: async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
      console.log(req.body)
      if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required." });
      }
      
      console.log(req.body, "Request body logged correctly");
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists." });
      }
      const newUser = new User({ 
        name: name,
        email: email,
        phone: phone,
        password: password,
      });
      const savedUser = await newUser.save();
      res.status(200).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error occurred", error: error.message });
    }
  },                       


  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required." });
      }
      
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password." });
      }
      
    //   console.log(req.session.user);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("user", user)
      res.status(200).json({ message: "Login successful",token, user});
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "An error occurred during login.", error: error.message });
    }
    
  },
  updateProfilePictures: async (req, res) => {
    try {
        console.log("ambadan adi")
      const userId = req.userId;
      console.log(userId,"sssssssssssssssssss") 
      if (!userId || !req.files || req.files.length === 0) {
        return res.status(400).json({ message: "User ID and at least one profile picture are required." });
      }

      const filePaths = req.files.map(file => file.filename); 
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      user.profilePic = filePaths;
     const userData= await user.save();

      res.status(200).json({ message: 'Profile pictures updated successfully!', filePaths: filePaths,user:userData });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update profile pictures.' });
    }
  }
}


module.exports = { userController };
