import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { addresSchema } from '../components/FeedbackValidation';

export default function MyOrder(props) {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [productQuantities, setProductQuantities] = useState({});


  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get('http://localhost:5300/api/cart', config)
      .then((res) => {
        setProducts(res.data);

        const quantities = {};
        res.data.forEach((item) => {
          quantities[item.id] = item.quantity;
        });
        setProductQuantities(quantities);
      })
      .catch((err) => console.log(err));
  }, []);

   const handleSubmit = (e) => {
    e.preventDefault();

if (!address.trim()) {
    setAddressError('Address is required');
    return;
  }
    // Validate the address using the schema
 if (!address.trim()) {
    setAddressError('Address is required');
    return;
  }

  // Check if address is at least 5 characters long
  if (address.trim().length < 5) {
    setAddressError('Address must be at least 5 characters long');
    return;
  }

  // Clear any previous address errors
  setAddressError('');



    const token = window.localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      address,
    };

    axios
      .post('http://localhost:5300/api/order', data, config)
      .then((res) => {
        console.log(res);
        navigation.navigate('/successpage')
        setAddress(''); // Reset the address field after successful submission
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
  <div className="min-h-screen bg-gray-100">
    <div className="py-4 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 Raleway">Secure Checkout</h1>
      </div>
    </div>

    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {/* Your SVG path */}
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 raleway">Delivery Address</h2>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="address"
              placeholder="Enter your delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full px-4 py-3 rounded-md border ${
                addressError ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-600`}
            />
            {addressError && <div className="text-red-500 text-sm mt-1">{addressError}</div>}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-48 h-48 object-cover" />
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                        <p className="text-gray-600 raleway">₦ {item.product.price}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-gray-800 raleway">Quantity: {productQuantities[item.id] || item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 raleway">Cart Summary</h2>
              <p className="text-gray-600 raleway">Total Items: {products.length}</p>
              <p className="text-gray-600 raleway">
                Total Cost: ${' '}
                {products.reduce(
                  (total, item) => total + item.product.price * (productQuantities[item.id] || item.quantity),
                  0
                )}
              </p>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none transition-colors duration-200"
            >
              Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
