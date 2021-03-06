import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Tosin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'Peter',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Apple watch series 7',
      category: 'watch',
      image: '/images/watch.jpg',
      countInStock: 10,
      price: 750,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Iphone 13 pro',
      category: 'phone',
      countInStock: 20,
      image: '/images/iphone13.webp',
      price: 1200,
      brand: 'Apple',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Airpods max',
      category: 'airpods',
      image: '/images/airpod.webp',
      countInStock: 0,
      price: 900,
      brand: 'Apple',
      rating: 4.8,
      numReviews: 17,
      description: 'high quality product',
    },
    {
      name: 'Iphone 12 pro',
      category: 'phone',
      image: '/images/iphone12.webp',
      countInStock: 5,
      price: 999.9,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      name: 'Airpod pro',
      category: 'airpods',
      countInStock: 15,
      image: '/images/airpod2.webp',
      price: 199,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Macbook pro 2021',
      category: 'laptops',
      image: '/images/macbook.webp',
      countInStock: 12,
      price: 1999,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
  ],
};

export default data;
