/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import cors from 'cors';
// import fol from '.'

dotenv.config({ path: '.env' });

// connect to mongodb
// mongoose.connect('mongodb://localhost/shoplift');
s;
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.CONNECTION_URL);
    console.log(`mongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

const app = express();

// app.get('/api/products/:id', (req, res) => {
//   // res.send(data.products);
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product not found' });
//   }
// });
app.use(express.json());
app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  // res.send('hello');
});
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// console.log(process.env);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
