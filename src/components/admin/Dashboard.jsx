import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../Home/Navbar';

const Dashboard = () => {

    const [today,setToday] =useState('')
    const [week,setWeek] =useState('')
    const [month,setMonth] =useState('')
    const [year,setYear] =useState('')
    const [lifetime,setLifetime] =useState('')
    const uri = process.env.REACT_APP_API_URL


    const fetchSales = async () => {
        try {
            const responseToday = await axios.get(uri+'/transactions/summary/today');
         setToday(responseToday.data.sumOfPrices)
         const responseWeek = await axios.get(uri+'/transactions/summary/week');
         setWeek(responseWeek.data.sumOfPrices)
         const responseMonth = await axios.get(uri+'/transactions/summary/month');
         setMonth(responseMonth.data.sumOfPrices)
         const responseYear = await axios.get(uri+'/transactions/summary/month');
         setYear(responseYear.data.sumOfPrices)
         const responseAll = await axios.get(uri+'/transactions/summary/all');
         setLifetime(responseAll.data.sumOfPrices)
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };

    useEffect(() => {


        const token = localStorage.getItem('token');
      
        if (token) {
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        fetchSales();
    }, []);

    return (
        <div>
            <Navigation />
            <div className="container mt-5">
                <h2 className="mb-4">Sales Dashboard</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card bg-primary text-white mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales Today</h5>
                                <p className="card-text">Total Sales: ₹{today}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card bg-success text-white mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales This Week</h5>
                                <p className="card-text">Total Sales: ₹{week}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card bg-warning text-white mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales This Month</h5>
                                <p className="card-text">Total Sales: ₹{month}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card bg-danger text-white mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales This Year</h5>
                                <p className="card-text">Total Sales: ₹{year}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card bg-dark text-white mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales lifetime</h5>
                                <p className="card-text">Total Sales: ₹{lifetime}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Add similar cards for other time periods */}
                <h2 className="mt-5 mb-4">Featured Products</h2>
             
            </div>
        </div>
    );
};

export default Dashboard;
