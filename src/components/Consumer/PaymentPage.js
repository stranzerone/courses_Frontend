import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "./Style.css"
import { useNavigate, useParams } from 'react-router-dom';
const PaymentPage = () => {
    const [loading, setLoading] = useState(false);
    const [refral,setRefral]  =useState('')
    const [rStatus,setrStatus]  =useState("0")
    const [price,setPrice]  =useState()
const id = useParams().id
const uri = process.env.REACT_APP_API_URL
const Key = process.env.REACT_APP_PAYMENT_KEY
const [product,setProduct]  =useState()
const navigate = useNavigate()

const fetchProductById = async () => {
    try {
        const response = await axios.get(uri+`/product/productById/${id}`);
        setProduct(response.data);
        setPrice(response.data.price)
    } catch (error) {
      console.error(error)
    } 
};



const handleApplyReferral = async() => {
    // Send referral code to backend
   try{

    const token = localStorage.getItem('token');
      
        if (token) {
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

const code = await axios.post(uri+"/auth/findRefral",{refralCode:refral})
if(code.status===200){
    setrStatus("1")
    setPrice(product.price - product.price *20/100)
}else{
    setrStatus('2')
    setPrice(product.price)
}
   }catch(error){
   
  
    console.error(error)
   }
    // You can make an API call to send the referral code to the backend here
  };


const paymentSuccessHandle = async(response)=>{
try{

    const newPayment = axios.post(uri+"/transactions/paymentSuccess",{response,id,product,price})
   navigate('/profile')


}catch(error){
    console.error(error)
}
}



    useEffect(()=>{
  fetchProductById()
        const token = localStorage.getItem('token');
      
        if (token) {
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    },[])

    const handlePayment = async () => {
        setLoading(true);
        
        try {
            const response = await axios.post(uri+'/transactions/initate',{id,product,price});
            const { orderId } = response.data;

            const options = {
                key: Key,
                amount: price, // Amount in paisa (example: 1000 paisa = ₹10)
                currency: 'INR',
                name: 'COOOUU',
                description: 'Product Purchase',
                order_id: orderId,
                handler: function (response) {
                   
                        console.log(response)

    axios.post(uri+"/transactions/sendRecepit")


                        alert('Payment Successful!');

                        paymentSuccessHandle(response)
                        
                        setLoading(false);
                        
                    
                },
                prefill: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    contact: '1234567890'
                },
                theme: {
                    color: '#F37254'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                console.log('Payment failed:', response.error);
                // Handle payment failure
            });

            rzp.on('payment.success', function (response) {
             //   handlePaymentSuccess(response);
             console.log("payment is success",response)
            });
    
            rzp.on('payment.cancelled', function (response) {
                console.log('Payment cancelled:', response.error);
                // Handle payment cancellation
            });
            rzp.open();
        } catch (error) {
            console.error('Error processing payment:', error);
            setLoading(false);
            // Handle error
        }
    };

    return (
        <div className="container"  style={{position:'center'}}>
        <h1>Payment Page</h1>
        {product &&  rStatus==="1"? <h1>{product.price - product.price *20/100}</h1>:product ?<h1>{product.price}</h1>:null}
        <div className="container mt-5">
      <div className="mb-3">
        <label htmlFor="referral" className="form-label">Have A Referral Code</label>
        <div className="input-group">
          <input 
            type="text" 
            className="form-control" 
            id="referral" 
            value={refral} 
            onChange={(e) => setRefral(e.target.value)} 
          />
          <button 
            className="btn btn-primary" 
            type="button" 
            onClick={handleApplyReferral}
          >
            Apply
          </button>
        </div>
        {rStatus==="1"?<p>code Is applied</p>:rStatus==='2'?<p>invalid refralCode</p>:null}
      </div>
      <div>refral code : 6e6ed3p3</div>
    </div>
        <button className="btn btn-primary" onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
        </button>
        <div>
            card no : 5267 3181 8797 5449
            cvv    :123 
            exp   :12/30
        </div>
        {loading && (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        )}
    </div>
    );
};






export default PaymentPage;
