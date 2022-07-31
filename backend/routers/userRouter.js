import express from 'express';
import User from '../models/userModel.js';
import data from '../data.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
      // check user in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ message: 'Incorrect email or password' });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      // checks if passwords match
      if (!isPasswordCorrect) return res.status(400).json({ message: 'Incorrect email or password' });
      const token = generateToken(user);
      res.status(200).send({ user, token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const oldUser = await User.findOne({ email });

      if (oldUser) return res.status(400).json({ message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        email,
        password: hashedPassword,
        name,
      });
      const token = generateToken(user);
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
      console.log(error);
    }
  })
);
export default userRouter;
