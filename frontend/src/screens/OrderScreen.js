import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const API = Axios.create({
  baseURL: 'http://localhost:7000',
});

const OrderScreen = () => {
  const { id } = useParams();
  const orderId = id;
  const [sdkReady, setSdkReady] = useState(false);
  // const orderId = this.props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log(orderDetails);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;
  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await API.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    //  if the order is not loaded from the backend
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      // loads the data from the backend
      dispatch(detailsOrder(orderId));
    } else {
      // checks if the order is not paid
      if (!order.isPaid) {
        // checks if the paypal button is not loaded
        if (!window.paypal) {
          // adds the paypal scripts
          addPayPalScript();
        } else {
          // paypal already loaded
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  console.log(order);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      {/* <h1>Order {order._id}</h1> */}
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong>
                  {order.shippingAddress.address},{order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {/* {order.isDelivered ? (
                  <MessageBox variant="success"> Delivered at {order.deliveredAt} </MessageBox>
                ) : (
                  <MessageBox variant="danger"> Not Delivered {order.deliveredAt} </MessageBox>
                )} */}
              </div>
            </li>
            <li>
              <div className="card card-body">
                {/* <h2>Payment</h2> */}
                <p>
                  <strong>Payment Method:</strong> {order.paymentMethod} <br />
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Thank you For your order. <br /> <br />
                    Order ID: {order._id} <br />
                    paidAt: {order.paidAt.substring(0, 10)}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger"> Not paid </MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img src={item.image} alt={item.name} className="small"></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>

                        <div>
                          {item.qty} x N{item.price} = N{item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>N{order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>N{order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>N{order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>N{order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                    </>
                    // {loadingPay && <LoadingBox></LoadingBox>}
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
