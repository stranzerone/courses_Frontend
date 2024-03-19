import React, { useEffect } from 'react';
import axios from 'axios';
import Home from './components/Home/Home.jsx';

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);
  
  return (
    <div>
        <div>
          <Home />
        </div>
    </div>
  );
};

export default App;
