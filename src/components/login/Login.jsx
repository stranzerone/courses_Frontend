import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser]  =useState('')
  const navigate = useNavigate()
  const uri = process.env.REACT_APP_API_URL

const [status,setStatus] =useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
    
      const response = await axios.post(uri+'/auth/login', {
        email,
        password
      });

      console.log(response.data)
     setStatus(response.status)
      // Assuming the response contains the authorization token
     

      // Set the token in the authorization header for future requests
      console.log(response.status)
      if(response.status===200){
        const  token  = response.data.accessToken;
        const type = response.data.type

       console.log(response.data)
      localStorage.setItem("type",type)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     localStorage.setItem("token",token)
   
     navigate('/viewProducts')

    


      }else{
        alert("something went wrong")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


useEffect(()=>{

  const user = localStorage.getItem("type")
setUser(user)

},[])

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light"  style={{backgroundColor: user?"crimson":"wheat"}}>
      <div className="card p-4 shadow">
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
         
          <button type="submit" className="btn btn-success w-100"><p className="text-decoration-none text-white">Login</p></button>
        </form>
        <div className="text-center mt-3">
          <a href="/signup" className="text-decoration-none">Don't have an account? Sign up here.</a>
        </div>
        {status==202?<p className="text-decoration-none text-danger">INVALID EMAIL</p>:status==203?<p className="text-decoration-none text-danger">INVALID Password</p>:null}

      </div>
    </div>
  );
};

export default Login;
