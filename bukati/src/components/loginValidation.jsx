import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*['"]).*$/;

export const loginValidation = yup.object().shape({
  email: yup.string().email("Please enter a valid email").trim().required('Required'),
  password: yup
    .string()
    .min(12, 'Password must be at least 12 characters')
    .matches(passwordRules, 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one symbol, no single or double quotes')
    .trim()
    .required('Required'),
});

export const changePassword = yup.object().shape({
  newPassword: yup
    .string()
    .min(12, 'Password must be at least 12 characters')
    .matches(passwordRules, 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one symbol, no single or double quotes')
    .trim()
    .required('Required'),
});