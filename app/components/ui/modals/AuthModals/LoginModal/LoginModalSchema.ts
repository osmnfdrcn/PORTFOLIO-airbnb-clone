import * as yup from "yup";

const LoginModalSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please enter a valid email address"
    ),
  password: yup.string().required("Password is required"),
});

export default LoginModalSchema;
