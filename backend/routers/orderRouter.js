/* eslint-disable no-unused-vars */
import express from 'express';
import expressAsynchandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
  '/mine',
  isAuth,
  expressAsynchandler(async (req, res) => {
    // console.log(req.user._id);
    const orders = await Order.find({ user: req.user._id });
    // console.log(orders);
    res.send(orders);
  })
);

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

orderRouter.get(
  '/:id',
  isAuth,
  expressAsynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    // if the order exists
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  })
);

// eslint-disable-next-line no-unused-vars
orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
export default orderRouter;
