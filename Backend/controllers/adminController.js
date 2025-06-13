const User = require('../model/userModel');

const adminController = {
  getAllUsers: async (req, res) => {
    try {
      console.log("Fetching all users...");
      const users = await User.find({ isAdmin: false });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Error fetching users' });
    }
  },

  getUserByQuery: async (req, res) => {
    try {

      console.log("asssss")
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user' });
    }
  },

  updateUserByQuery: async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const { name, email, phone, password } = req.body;
      const updateData = { name, email, phone, password };

      if (req.files && req.files.profilePic) {
        const profilePic = req.files.profilePic[0].filename;
        updateData.profilePic = profilePic;
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    }
  },
  deleteUserByQuery: async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'No user ID provided' });
    }

    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  },
  createUser: async (req, res) => {
    try {
      console.log("Creating new user...");
      const { name, email, phone, password } = req.body;
      console.log(req.body)
      const profilePics = req.files ? req.files.map(file => file.filename) : [];

      const newUser = new User({
        name,
        email,
        phone,
        password,
        profilePic: profilePics,
      });

      await newUser.save();

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  }
};


module.exports = { adminController };
