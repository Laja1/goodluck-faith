import * as yup from "yup";

// Password rules: At least 12 characters, one digit, one lowercase letter, one uppercase letter, and one symbol
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*['"]).*$/;

export const signupValidation = yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().trim().email("Please enter a valid email").required('Required'),
  password: yup
    .string()
    .min(12, 'Password must be at least 12 characters')
     .matches(passwordRules, 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one symbol, no single or double quotes')
    .trim()
    .required('Required'),
});