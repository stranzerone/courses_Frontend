import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Home/Navbar.jsx"
const ProductList = () => {
    // Dummy data for demonstration
  const [products, setProducts] = useState([])

const type = localStorage.getItem('type')
const uri = process.env.REACT_APP_API_URL
  useEffect(()=>{
  
 
    const token = localStorage.getItem('token');
  
    if (token) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
},[])

    const fetchProducts = async() =>{

try{

    const response = await axios.get(uri+"/product/allProducts")

  
    if(response){
        setProducts(response.data)
    }

}catch(error){

    console.error(error)
}

    }


    useEffect(()=>{

        const token = localStorage.getItem('token');
  
        if (token) {
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

fetchProducts()
    },[])


    const navigate = useNavigate()
    const handleUpdate = (id) => {
      

      navigate("/BuyProduct/"+id)
    };

    return (

        <div>


        <div>
            <Navbar />
        </div>
        <div className="container mt-5">
            <h2>Products</h2>
            <div className="row">
                {products.map((product, index) => (
                    <div key={index} className="col-md-4 mb-4">
  <div className="card shadow">
    <div className="card-body">
      <img src={product.image} style={{ width: "100%", height: "200px", objectFit: "cover" }} alt='auto' />
      <h5 className="card-title">{product.title}</h5>
      <p className="card-text">Price: {product.price}</p>
      <p className="card-text">Seller: {product.seller}</p>
      <div>
        {type === "admin" ? (
          <button className="btn btn-primary" onClick={() => navigate(`/updateProduct/${product.productId}`)}>Update Product</button>
        ) : (
          <button className="btn btn-primary" onClick={() => handleUpdate(product.productId)}>Buy Product</button>
        )}
      </div>
    </div>
  </div>
</div>

                ))}
            </div>
        </div>

        </div>
    );
};

export default ProductList;
