import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';

export default function CartScreen() {
  const dispatch = useDispatch();
  //   const productId = props.match.params.id;
  const params = useParams();
  const productId = params.id;
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h1> CartScreen</h1>
      <p>
        ADD TO CART : PRODUCTID: {productId} Qty: {qty}
      </p>
    </div>
  );
}
