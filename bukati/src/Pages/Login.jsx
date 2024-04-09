import React,{useState} from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loginValidation } from '../components/loginValidation';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

export default function Login() {
   const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
   const handleSubmit = (values) => {
    axios.post('http://localhost:5300/api/auth/login', values)
      .then(res => {
       
        window.localStorage.setItem('token', res.data.token);
        console.log(res.data.token);
       
        navigation.navigate('/');
      })
      .catch(err => {
       
        setError('Invalid credentials. Please try again.'); // Set error message
        console.log(err);
      });
  };

  return ( <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-row w-[723px] h-[510px] border-[#000000] border-[0.2px] rounded-lg gap-7     shadow-xl items-center justify-center'>
    <Formik initialValues={{email:'', password:''}} validationSchema={loginValidation} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
            
          <Form className='flex flex-col p-5 gap-3'>
            <h1 className='text-lg text-[#A088C6] raleway text-[25px] italic text-center font-extrabold'>
              Bukati.
            </h1>
            <div className='flex flex-col pl-3'>
              <label htmlFor='email' className='raleway text-sm'>Email Address</label>
              <Field type='email' name='email' className='border-[0.5px] text-[14px] raleway border-[#D9D9D9] pl-2 h-[35px] w-[290px] rounded-md' />
           {errors.email && touched.email ? (<div className='w-[250px] text-[13px] raleway'>{errors.email}</div>) : null}
            </div>
             
            <div className="flex flex-col pl-3 relative">
  <label htmlFor="password" className="raleway text-sm">
    Password
  </label>
  <div className="relative">
    <Field
      type={showPassword ? 'text' : 'password'}
      name="password"
      className="border-[0.5px] border-[#D9D9D9] text-[14px] raleway pl-2 h-[35px] w-[290px] rounded-md pr-8"
    />
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="focus:outline-none"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>
  {errors.password && touched.password ? (<div className='w-[250px] text-[13px] raleway'>{errors.password}</div>) : null}
</div>
             {error && <div className="text-red-500 text-center text-sm mb-4">{error}</div>}
            <button type='submit'  className='bg-[#A088C6] raleway text-white px-10 rounded-lg py-3'>
              Submit
            </button>
           
            <p className='text-center raleway'>
              Dont have an account?{' '}
            <Link to='/Signup'>  <span className='text-[#1976d2] raleway'>Sign Up</span></Link>
            </p>
</Form>
      )}
      
    
    </Formik>
     <div className='items-center flex justify-center'>
          <img
            src='pizza.jpg'
            className='w-[350px] h-[510px] rounded-l-lg rounded-r-lg'
            alt='Signin Image'
          />
        </div>
    </div></div>
  )
}
