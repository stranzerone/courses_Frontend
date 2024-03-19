import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Style.css"
import Navigation from '../Home/Navbar';
const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const uri = process.env.REACT_APP_API_URL

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
        console.log(token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {



      const response = await axios.get(uri+'/auth/findUser');
      setUserData(response.data.foundUser);
      console.log(response.data.foundUser)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
    <div>
        <Navigation />
    </div>
    <div className="container mt-5">
      <div className="card profile-card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">User Profile</h2>
          <div className="profile-details">
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>First Name:</strong> {userData.fName}</p>
            <p><strong>Last Name:</strong> {userData.lName}</p>
          </div>
          <div className="referral-link">
            <h3 className="mt-4">Referral Link:</h3>
            <p>{userData.refralCode}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
