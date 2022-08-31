import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddress from './screens/shippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems)
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // console.log(userInfo);
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              shopinner
            </Link>
          </div>
          <div>
            <Link to="/cart">
              <FontAwesomeIcon icon="fa-solid fa-mug-saucer" />
              {/* <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> */}
              <FontAwesomeIcon icon={faCartShopping} />
              {/* <FontAwesomeIcon icon="fa-regular fa-cart-shopping" color="red" /> */}
              {/* Cart */}
              {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.user.name}
                  <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.user.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#/signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>
            <Route path="/product/:id" element={<ProductScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/shipping" element={<ShippingAddress />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route path="/orderhistory" element={<OrderHistoryScreen />}></Route>
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<HomeScreen />}></Route>
          </Routes>
        </main>
        <footer className="row center">All right reserved &copy; 2022 </footer>
      </div>
    </Router>
  );
}

export default App;
