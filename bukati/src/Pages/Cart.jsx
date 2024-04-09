import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Cart() {
  const [products, setProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [isComponentMounted, setIsComponentMounted] = useState(true);

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
      .get("http://localhost:5300/api/product", config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5300/api/cart', config);
        if (isComponentMounted) {
          setProducts(res.data);
          const quantities = {};
          res.data.forEach((item) => {
            quantities[item.id] = item.quantity;
          });
          setProductQuantities(quantities);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();

    return () => {
      setIsComponentMounted(false);
    };
  }, []);

  const handleAddToCart = useCallback(
    (productId) => {
      setProductQuantities((prevProductQuantities) => {
        return {
          ...prevProductQuantities,
          [productId]: (prevProductQuantities[productId] || 0) + 1,
        };
      });
    },
    []
  );

  const handleRemoveFromCart = useCallback(
    (productId) => {
      setProductQuantities((prevProductQuantities) => {
        const updatedQuantities = { ...prevProductQuantities };
        updatedQuantities[productId] = Math.max((prevProductQuantities[productId] || 1) - 1, 0);
        return updatedQuantities;
      });
    },
    []
  );

  const handleClicked = async () => {
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

    try {
      for (const item of products) {
        const quantity = productQuantities[item.id] ?? item.quantity;
        await axios.put(`http://localhost:5300/api/cart/${item.id}`, { quantity }, config);
      }
      navigation.navigate('/MyOrder')
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (productId) => {
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

    try {
      await axios.delete(`http://localhost:5300/api/cart/${productId}`, config);
      setProducts((prevProducts) => prevProducts.filter((item) => item.id !== productId));
    } catch (err) {
      console.log(err);
    }
  };





   return (
     <div className="min-h-screen bg-gray-100">
      <div className="py-4 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
              <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-48 h-48 object-cover"
                />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{item.product.name}</h2>
                    <p className="text-gray-600">$ {item.product.price}</p>
                    <span className=" text-gray-800">Quanitity: {productQuantities[item.id] || item.quantity}</span>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="p-2 rounded-l-md bg-[#A088C6] text-white hover:bg-indigo-700 focus:outline-none"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      -
                    </button>
                    <span className="px-4 text-gray-800">1</span>
                    <button
                      className="p-2 rounded-r-md bg-[#A088C6] text-white hover:bg-indigo-700 focus:outline-none"
                      onClick={() => handleAddToCart(item.id)}
                    >
                      +
                    </button>
                    <button onClick={()=>handleDelete(item.id)} className="ml-4 text-gray-600 hover:text-red-600 focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Cart Summary</h2>
            <p className="text-gray-600">Total Items: {products.length}</p>
            <p className="text-gray-600">Total Cost: $ {products.reduce((total, item) => total + item.product.price * (productQuantities[item.id] || item.quantity), 0)}</p>
          </div>
          <button
            onClick={handleClicked}
            className="px-6 py-3 bg-[#A088C6] text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;