import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./Navbar.css"; // Import your custom CSS file
import axios from 'axios';
import { Dropdown, DropdownButton } from 'react-bootstrap';
const Navigation = () => {
  // Use state to manage the user type
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const uri = process.env.REACT_APP_API_URL

  const Logout= () => {
     localStorage.removeItem("token");
   localStorage.removeItem("type");
   setType(null)
    navigate("/") }

const userType =async()=>{

try{


  const response =await axios.get(uri+'/auth/type')
  setType(response.data.user)

}catch(error){
  console.error(error)
}

}


    useEffect(()=>{


      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      userType()


    },[])

  // Check if user is admin or user





  // If type is not found in localStorage, hide the navbar
 
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-main">
        <Navbar.Brand href="#" className="navbar-logo">
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{background:"white"}} />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-links">
          <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home" className="nav-link">Home</Nav.Link>

          <Nav.Link as={Link} to="/viewProducts" className="nav-link">Products</Nav.Link>
          <Nav.Link as={Link} to="/profile" className="nav-link">My Products</Nav.Link>
          <Nav.Link as={Link} to="/profilePage" className="nav-link">Profile</Nav.Link>

          {/* <Nav.Link as={Link} to="/profile" className="nav-link">Profile</Nav.Link> */}
          </Nav>
      {type==='admin'?  <DropdownButton
    className="btn btn-success"
    title="ADMIN"
    id="dropdown-menu"
  >
    <Dropdown.Item eventKey="item1" >
    <NavLink to='/dashboard'>Dashboard</NavLink>
    </Dropdown.Item>
    <Dropdown.Item eventKey="item2" >
    <NavLink to='/addCourse'>Add product</NavLink>

    </Dropdown.Item>
    <Dropdown.Item eventKey="item2" >
    <NavLink to='/ordersPage'>Orders</NavLink>

    </Dropdown.Item>
    {/* Add more Dropdown.Item elements as needed */}
  </DropdownButton>:<Button className='btn-success'>User</Button>}
         
      <Button variant="outline-light" className="nav-button " onClick={Logout}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
