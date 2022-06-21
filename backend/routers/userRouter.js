import express from 'express';
import User from '../models/userModel.js';
import data from '../data.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

export default userRouter;
