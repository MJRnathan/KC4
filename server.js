// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// const User = require('./models/User'); // Assuming you have a User model
// const app = express();

// dotenv.config();
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // User Schema Example
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// const User = mongoose.model('User', userSchema);

// // 1. Request password reset
// app.post('/api/forgot-password', async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   const resetLink = `http://localhost:4200/reset-password/${token}`;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Password Reset Request',
//     html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).json({ message: 'Error sending email', error });
//     }
//     res.status(200).json({ message: 'Password reset email sent' });
//   });
// });

// // 2. Reset password
// app.post('/api/reset-password', async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;

//     await user.save();
//     res.status(200).json({ message: 'Password reset successfully' });
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid or expired token', error });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });
