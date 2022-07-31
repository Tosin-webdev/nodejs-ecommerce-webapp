import express from 'express';
import expressAsynchandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsynchandler(async (req, res) => {
    console.log(req.user._id);
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    }
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    console.log(order);
    try {
      const createdOrder = await order.save();
      res.status(201).send({ message: 'New Order Created', order: createdOrder });
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

export default orderRouter;
