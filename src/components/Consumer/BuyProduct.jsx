import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../Home/Navbar';
import "./Style.css"
const SingleProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const uri = process.env.REACT_APP_API_URL

const navigate = useNavigate()
    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/product/productById/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductById();
    }, [id]);

    useEffect(()=>{
  
        const token = localStorage.getItem('token');
      
        if (token) {
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    },[])
  
    const handlePayment = async () => {
        try {
           
           
            const response = await axios.get(uri+"/transactions/order");
           console.log(typeof response.data)

           const orderId = response.data
            const options = {
                key: 'rzp_live_GAK8W8HDL6w4uO', // Replace with your Razorpay key
                amount: product.price * 100 , // Amount is in paisa (1 INR = 100 paisa)
                currency: 'INR',
                name: product.title,
                description: product.description,
                image: product.image,
                order_id: orderId, // Use the fetched order ID
                handler: function (response) {
                    console.log(response)
                    alert('Payment Successful!');
                },
                prefill: {
                    name: 'John Does',
                    email: 'john@examples.com',
                    contact: '12345678890'
                },
                theme: {
                    color: '#F37254'
                }
            };
            const rzp = new window.Razorpay(options);
            console.log('Razorpay Options:', options);
            rzp.open();
        } catch (error) {
            

            console.error('Error processing payment:', error);
            // Handle error
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>


        <div>
        <Navigation /> {/* Include Navigation component here */}

        </div>

        <div className="container mt-5">
  <div className="row">
    <div className="col-md-6">
      <img src={product.image} className="img-fluid product-image" alt={product.title} />
    </div>
    <div className="col-md-6 product-details">
      <h2 className="product-title">{product.title}</h2>
      <p className="product-price">Price: RS {product.price}</p>
      <div className="payment-gateway">
     
        <button className="btn btn-primary buy-now-button" onClick={() => navigate("/paymentPage/"+product.productId)}>Procced</button>
      </div>
    </div>
  </div>
</div>


        </div>
    );
};

export default SingleProductPage;
