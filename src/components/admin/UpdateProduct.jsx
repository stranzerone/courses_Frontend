import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../Home/Navbar';

const UpdateProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [seller, setSeller] = useState('');
    const [image, setImage] = useState('');
    const { id } = useParams();
    const uri = process.env.REACT_APP_API_URL

const navigation  = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(uri+`/product/productById/${id}`);
                const product = response.data;
                setTitle(product.title);
                setPrice(product.price);
                setDescription(product.description);
                setSeller(product.seller);
                setImage(product.image);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductById();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            title: title,
            price: price,
            description: description,
            seller: seller,
            image: image
        };

        try {
            const response = await axios.put(uri+`/product/updateProduct/${id}`, updatedProduct);
            console.log(response.data);
            if (response.status === 200) {
                alert("Product updated successfully");
              navigation('/viewProducts') // Redirect to the product list page
            } else {
                alert("Product update failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async () => {
        try {
            const response = await axios.delete(uri+`/product/deleteProduct/${id}`);
            if (response.status === 200) {
                alert("Product deleted successfully");
               navigation('/viewProducts')// Redirect to the product list page
            } else {
                alert("Product deletion failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navigation />
            <div className="container mt-5">
                <h2>Update Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image URL</label>
                        <input type="text" className="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="seller" className="form-label">Seller</label>
                        <input type="text" className="form-control" id="seller" value={seller} onChange={(e) => setSeller(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Update Product</button>
                    <button onClick={deleteProduct} className="btn btn-danger mx-3">Delete Product</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
