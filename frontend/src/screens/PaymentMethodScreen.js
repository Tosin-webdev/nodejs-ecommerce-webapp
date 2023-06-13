import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentMethodScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log(shippingAddress);
  if (!shippingAddress.address) {
    navigate('/shipping');
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/paypal/placeorder');
  };
  const submitHandler2 = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/flutterwave/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method </h1>
        </div>
        <div>
          <div>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            PayPal
          </button>
        </div>
      </form>

      {/* <form className="form" onSubmit={submitHandler2}>
        <div>
          <h1>Payment Method 2</h1>
        </div>

        <div>
          <div>
            <label htmlFor="stripe">Flutterwave</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Flutterwave
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default PaymentMethodScreen;
