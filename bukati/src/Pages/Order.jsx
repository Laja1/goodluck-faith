import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoIosBicycle } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store'; // Ensure to import addToCart from the correct path
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
function Order() {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [selectItem, setSelectItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // Add a state for quantity

    useEffect(() => {
        axios.get(`http://localhost:5300/api/product/${id}`)
            .then(res => {
                setSelectItem(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleClicked = () => {
        const token = window.localStorage.getItem('token');
        if (!token) {
          navigation.navigate('/login')
            console.log('Token not found');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .post(`http://localhost:5300/api/cart`, { productId: selectItem.id, quantity }, config)
             .then((res) => {
                console.log(res);
                toast.success('Item added to cart!'); // Show a success toast
            })
           .catch((err) => {
                console.log(err);
                toast.error('Failed to add item to cart.'); // Show an error toast
            });
    };

    return (
        <div>
          <Toaster />
            <Link to='/'> <div className='left-0 pl-10 pt-5 flex-row flex underline items-center '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            back to home</div></Link>

            <div className='items-center flex justify-center'>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <h2 className='text-center text-3xl font-bold py-5 raleway'>Food</h2>

                        {selectItem && (
                            <div className='w-[700px] grid grid-cols-2 gap-4 h-[500px] shadow-xl rounded-xl ' key={selectItem.id}>
                                <div>  <img src={selectItem.imageUrl} alt={selectItem.name} className='w-[400px] h-[500px] rounded-2xl' /></div>
                                <div className='justify-center flex-col flex gap-5'>
                                    <h3 className='text-2xl font-bold raleway'>{selectItem.name}</h3>
                                    <p className='italic raleway text-[13px] '>{selectItem.description}</p>
                                    <div className='flex-row flex items-center gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#1AC84B" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1AC84B" className="w-4 h-4 ">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg><p className='text-[13px]'>4.0 100+ ratings</p>
                                    </div>   <div className='flex-row flex items-center text-[13px] gap-2'><IoIosBicycle /> 30 Mins Delivery Time</div>
                                    <p><span className='font-bold text-xl'>Price: </span>${selectItem.price}</p>
                                    <div className=' justify-center flex-col items-center gap-4 flex'>
                                        <div className='bg-[#A088C6] w-[170px] h-[55px] items-center justify-center flex text-white text-sm rounded-xl'>
                                            <button onClick={() => handleClicked(quantity)}>Add To Cart</button>
                                        </div>
                                        <Link to='/cart'>
                                            <div className='border-[#A088C6] text-sm border-2 w-[170px] h-[55px] items-center justify-center flex text-black rounded-xl'><button>View Cart</button></div>
                                        </Link>
                                    </div>

                                </div>

                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Order;