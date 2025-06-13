const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/userRoute'); 
const adminRouter = require('./routes/adminRoute');

const port = process.env.PORT || 7000;
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydatabase';

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
