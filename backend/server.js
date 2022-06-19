import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const app = express();

app.get('/api/products/:id', (req, res) => {
  // res.send(data.products);
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/', (req, res) => {
  res.send('Server is ready');
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
