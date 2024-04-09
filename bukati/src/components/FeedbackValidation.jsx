import * as Yup from 'yup';

export const feedbackSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
    .required('Name is required'),

  email: Yup.string()
    .email('Invalid email')
    .trim()
    .required('Email is required'),

  feedbackType: Yup.string()
    .trim()
    .min(2, 'Feedback type must be at least 2 characters')
    
    .matches(/^[a-zA-Z\s]*$/, 'Feedback type can only contain letters and spaces')
    .required('Feedback type is required'),

  message: Yup.string()
    .trim()
    .min(10, 'Feedback details must be at least 10 characters')
    .max(500, 'Feedback details must be at most 500 characters')
    .required('Feedback details are required'),

  rating: Yup.number()
    .integer('Rating must be an integer')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .nullable(),
});

export const addresSchema = Yup.object().shape({
  name: Yup.string()
   
    .min(2, 'Address must be at least 2 characters')
    .max(50, 'Address must be at most 50 characters')
    .required('Address is required')
})