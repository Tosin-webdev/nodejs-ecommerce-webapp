import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

dotenv.config({ path: '.env' });

// connect to mongodb
mongoose.connect('mongodb://localhost/shoplift');

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
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
