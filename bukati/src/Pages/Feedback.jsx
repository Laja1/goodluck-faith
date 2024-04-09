import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { feedbackSchema } from '../components/FeedbackValidation';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const handleSubmit = (values) => {
    axios
      .post('http://localhost:5300/api/feedback', values)
      .then((res) => navigation.navigate('/') )
      .catch((err) => console.log(err));
    console.log(values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r bg-[#FFF] flex items-center justify-center">
      <div className="bg-[#FFFFFF] w-[1000px] rounded-lg shadow-xl p-8 max-w-md">
        <Link to="/">
          <div className="flex items-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-purple-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span className="text-purple-500 font-semibold ml-2">Back to Home</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Bukati Feedback Form</h1>
        <Formik
          initialValues={{ email: '', name: '', feedbackType: '', message: '' }}
          validationSchema={feedbackSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
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
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
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
              <div className="mb-4">
                <label htmlFor="feedbackType" className="block text-gray-700 font-bold mb-2">
                  Feedback Type
                </label>
                <Field
                  as="select"
                  name="feedbackType"
                  className={`appearance-none border ${
                    errors.feedbackType && touched.feedbackType
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                >
                  <option value="" className="raleway text-[12px]">
                    Select Feedback Type
                  </option>
                  <option value="bug" className="raleway text-[12px]">
                    Bug Report
                  </option>
                  <option value="feature" className="raleway text-[12px]">
                    Feature Request
                  </option>
                  <option value="general" className="raleway text-[12px]">
                    General Feedback
                  </option>
                </Field>
                <ErrorMessage
                  name="feedbackType"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                  Feedback Details
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