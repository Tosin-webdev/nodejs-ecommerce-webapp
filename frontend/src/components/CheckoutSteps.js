import React from 'react';

const CheckoutSteps = (props) => {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active' : ''}>Sign-In</div>
      <div className={props.step1 ? 'active' : ''}>Shipping</div>
      <div className={props.step1 ? 'active' : ''}>Payment</div>
      <div className={props.step1 ? 'active' : ''}>Place Order</div>
    </div>
  );
};

export default CheckoutSteps;
