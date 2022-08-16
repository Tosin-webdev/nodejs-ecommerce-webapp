import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState([]);
  // const [error, setError] = useState(false);
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger"> {error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
