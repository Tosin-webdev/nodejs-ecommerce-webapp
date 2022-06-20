import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen() {
  const dispatch = useDispatch();
  //   const productId = props.match.params.id;
  const params = useParams();
  const productId = params.id;
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  // console.log(qtyInUrl);
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Gp Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small"></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product), Number(e.target.value))}
                    ></select>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
