import * as Yup from "yup";

const { string, number, object, array, boolean, date, mixed, ref } = Yup;

export const loginFormSchema = object().shape({
  email: string().email().required("Email field required"),
  password: string().required("Password field required"),
});

export const registerFormSchema = object().shape({
  name: string().required("Name field required"),
  email: string().email().required("Email field required"),
  password: string().required("Password field required"),
  retype_password: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Password field required"),
  type: string().required("Please selecrt a type"),
});

export const updateFormSchema = object().shape({
  name: string().required("Name field required"),
  email: string().email().required("Email field required"),
  type: string().required("Please select a typw"),
});
