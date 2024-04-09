import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { contactSchema } from '../components/ContactValidation';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Contact() {
  const handleSubmit = (values) => {
    console.log(values);
    axios
      .post('http://localhost:5300/api/contact', values)
      .then((res) => {navigation.navigate('/') 
      console.log(res.data)})
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="flex flex-col w-[900px] border-2 border-[#fff]  md:flex-row rounded-lg shadow-xl ">
        <div
          className="bg-cover bg-center w-full h-96 md:h-auto"
          style={{ backgroundImage: "url('/contact.jpg')" }}
        ></div>
        <div className="bg-white p-8 w-full">
          <h2 className="text-3xl raleway  font-bold text-gray-800 mb-6 text-center">
            Get in Touch
          </h2>
          <Formik
            initialValues={{ email: '', name: '', message: '' }}
            validationSchema={contactSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="block raleway text-gray-700 font-bold mb-2">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className={`appearance-none border ${
                      errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block raleway text-gray-700 font-bold mb-2">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className={`appearance-none border ${
                      errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
              </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block raleway text-gray-700 font-bold mb-2">
                    Message
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    rows="4"
                    className={`appearance-none border ${
                      errors.message && touched.message ? 'border-red-500' : 'border-gray-300'
                    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}