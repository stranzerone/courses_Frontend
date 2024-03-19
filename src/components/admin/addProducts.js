// AddCourseEventPage.js

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navigation from '../Home/Navbar';
const AddCourseEventPage = () => {
    const [courseEvent, setCourseEvent] = useState({
        title: '',
        price: '',
        description: '',
        seller:'',
        image:''
    });



    const uri = process.env.REACT_APP_API_URL

useEffect(()=>{
  
    const token = localStorage.getItem('token');
  
    if (token) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
},[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(courseEvent);
            const response = await axios.post(uri+"/product/addProduct", courseEvent);
            if (response.status === 200) {
                window.alert("Product added successfully");
            } else {
                window.alert("Product adding failed");
            }
            setCourseEvent({
                title: '',
                price: '',
                description: '',
                seller: '',
                image:''
            });
        } catch (error) {
            console.error(error);
            window.alert("An error occurred while adding the product");
        }
    };
    
    return (


        <div>


        <div>
        <Navigation /> {/* Include Navigation component here */}

        </div>
        <div className="container mt-5">
            <h1>Add Digital Course or Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="title"
                        value={courseEvent.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={courseEvent.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="seller">seller:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="seller"
                        name="seller"
                        value={courseEvent.seller}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image Link:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        name="image"
                        value={courseEvent.image}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={courseEvent.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add Course/Event</button>
            </form>
        </div>

        </div>
    );
};

export default AddCourseEventPage;
