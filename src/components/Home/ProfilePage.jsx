import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../Home/Navbar.jsx";

const ProfilePage = () => {
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  const uri = process.env.REACT_APP_API_URL

  const fetchProducts = async (ids) => {
    try {

      
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      const productPromises = ids.map(productId =>
        axios.get(uri+`/product/productById/${productId}`)
      );
      const productResponses = await Promise.all(productPromises);
      const productsData = productResponses.map(response => response.data);
      return productsData;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchProductIds = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.get("http://localhost:5000/product/myPoducts");
        if (response && response.data) {
          const ids = response.data.map(product => product.ProductId);
          setProductIds(ids);
          const fetchedProducts = await fetchProducts(ids); // Pass ids to fetchProducts
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductIds();
  }, []);


  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Products</h2>
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow">
                <div className="card-body">
                  <img src={product.image} style={{ width: "100%", height: "200px", objectFit: "cover" }} alt='auto' />
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: {product.price}</p>
                  <p className="card-text">Seller: {product.seller}</p>
                  <button className="btn btn-primary" >View Product</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
