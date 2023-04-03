import * as yup from "yup";

const RegisterModalSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(1).max(30),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please enter a valid email address"
    ),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must contain at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),
  confirmPassword: yup
    .string()
    .required("Password Confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default RegisterModalSchema;
