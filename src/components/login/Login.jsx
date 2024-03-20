import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const uri = process.env.REACT_APP_API_URL;
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(`${uri}/auth/login`, {
        email,
        password
      });
      if (response.status === 200) {
        const token = response.data.accessToken;
        const type = response.data.type;

        localStorage.setItem("type", type);
        localStorage.setItem("token", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/home');
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error('Error:', error);
      setError("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("type");
    setUser(user);
  }, []);

  return (
    <div className={`container-fluid vh-100 d-flex align-items-center justify-content-center bg-light ${user ? "bg-crimson" : "bg-wheat"}`}>
      <div className="card p-4 shadow">
        <div>
          <p>ADMIN LOGIN : sahilmulanioneplus@gmail.com  pass 1234</p>
          <p>user LOGIN : ayanmulani2599@gmail.com  pass 1234</p>

        </div>
        <h2 className="text-center mb-4">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" required />
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <p  className="text-decoration-none">Don't have an account? Sign up here.</p>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
