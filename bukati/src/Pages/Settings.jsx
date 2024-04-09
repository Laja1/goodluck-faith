import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { changePassword } from '../components/loginValidation';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
export default function Settings() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (values) => {
    const token = window.localStorage.getItem('token');

    if (!token) {
     navigation.navigate('/login')
      setError('Token not found. Please log in again.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

  
axios
  .put('http://localhost:5300/api/user', { password: values.newPassword }, config)
  .then((res) => {
    if (res.data.message === "updated") {
      // Successful response
      window.localStorage.clear();
      window.location.reload();
      console.log(res.data);
      navigation.navigate('/login')
    } else if (res.data.message === "Please choose a different password") {
      // Handle specific error message
      setError("Please choose a different password");
    } else {
      // Handle other non-200 response status codes
      setError('Error updating password. Please try again.');
    }
  })
  .catch((err) => {
    setError('Error updating password. Please try again.');
    console.log(err);
  });}

  return (
    <div className="min-h-screen  bg-gray-100  flex items-center justify-center">
      <div className="bg-white w-[450px]  rounded-lg shadow-xl p-8 max-w-[500px]">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Change Password</h1>
        <Formik initialValues={{ newPassword: '' }} validationSchema={changePassword} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form>
                <div className="flex flex-col pl-3 pb-2 relative">
  <label htmlFor="newPassword" className="raleway text-center pb-2 text-sm">
  New Password
  </label>
  <div className="relative flex-row flex items-center gap-2 justify-center">
    <Field
      type={showPassword ? 'text' : 'password'}
      name="newPassword"
      className="border-[0.5px] border-[#D9D9D9] text-[14px] raleway pl-2 h-[35px] w-[300px] rounded-md pr-8"
    />
    <div className=" inset-y-0 right-0  flex items-center text-gray-500">
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="focus:outline-none"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>
  {errors.newPassword && touched.newPassword ? (<div className='w-[380px] py-2  text-center raleway text-[13px] raleway'>{errors.newPassword}</div>) : null}
</div>
              {error && <div className="text-red-500 raleway  text-sm mb-4">{error}</div>}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}