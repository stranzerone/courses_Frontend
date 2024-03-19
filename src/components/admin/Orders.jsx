import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../Home/Navbar';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const uri = process.env.REACT_APP_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        // Fetch orders
        const ordersResponse = await axios.get(uri+'/transactions/allTransactions');
        const ordersData = ordersResponse.data;
        setOrders(ordersData);

        // Fetch users
        const usersResponse = await axios.get(uri+'/auth/allUsers');
        const usersData = usersResponse.data;
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getEmail = (userId) => {
    const user = users.find(user => user._id === userId);
    return user ? user.email : '';
  };

  const getUsername = (userId) => {
    const user = users.find(user => user._id === userId);
    return user ? user.username : '';
  };


  return (
    <div>
<div>
    <Navigation />
</div>
  
    <div className="container mt-4">
      <h2 className="text-center mb-4">Order Table</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
             <th>Sr no</th>
              <th>Username</th>
              <th>Email</th>
              <th>Product ID</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
              <td>{index +1} </td>
              <td>{getUsername(order.userId)}</td>
                <td>{getEmail(order.userId)}</td>
                <td>{order.ProductId}</td>
                <td>${order.price}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default OrderTable;
