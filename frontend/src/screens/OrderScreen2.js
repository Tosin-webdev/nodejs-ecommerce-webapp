import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const API = Axios.create({
  baseURL: 'http://localhost:7000',
});

function OrderScreen2() {
  const { id } = useParams();
  const orderId = id;
  console.log(orderId);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log(orderDetails);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

  const config = {
    public_key: 'FLWPUBK_TEST-d613f21751ce7259631e25ca00043b89-X',
    tx_ref: Date.now(),
    amount: '100',
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'oladejit3@gmail.com',
      phonenumber: '090',
      name: 'joel ugwumadu',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <h1>Hello Test user</h1>

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button>
    </div>
  );
}
// <div className="App">
//   <h1>Hello Test user</h1>

// </div>

export default OrderScreen2;
