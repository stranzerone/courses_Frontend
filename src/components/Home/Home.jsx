import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../login/SignUp.jsx';
import Login from '../login/Login.jsx';
import AddCourseEventPage from '../admin/addProducts.js';
import ProductList from '../Consumer/ViewProducts.js';
import UpdateProduct from '../admin/UpdateProduct.jsx';
import Dashboard from '../admin/Dashboard.jsx';
import SingleProductPage from '../Consumer/BuyProduct.jsx';
import PaymentPage from '../Consumer/PaymentPage.js';
import axios from 'axios';
import ProfilePage from './ProfilePage.jsx';
import HeroPage from './HeroPage.jsx';
import UserProfile from '../Consumer/ProfilePageUser.jsx';
import OrderTable from '../admin/Orders.jsx';
const Home = () => {
  const [type, setType] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const t = localStorage.getItem('type');
      setType(t);
    }
  }, []);

  return (
    <div>
      <div>
        <Routes>
        <Route path="/viewProducts" element={<ProductList />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HeroPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addCourse" element={<AddCourseEventPage />} />
          <Route path="/displayProducts" element={<ProductList />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/BuyProduct/:id" element={<SingleProductPage />} />
          <Route path="/paymentPage/:id" element={<PaymentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profilePage" element={<UserProfile />} />
          <Route path="/ordersPage" element={<OrderTable />} />


        </Routes>
      </div>
    </div>
  );
};

export default Home;
