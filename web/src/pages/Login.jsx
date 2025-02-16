import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { Formik, Form, ErrorMessage } from "formik";
import { loginFormSchema } from "../../schema/schema";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

const Login = ({ login, errors }) => {
  const navigate = useNavigate();
  const formikRef = useRef(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const succeed = await login(values);

    if (succeed) {
      navigate("/");
    }

    setSubmitting(false);
  };

  useEffect(() => {
    if (errors) formikRef.current.setErrors(errors);
  }, [errors]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Alert />
        <Formik
          initialValues={initialValues}
          validationSchema={loginFormSchema}
          onSubmit={handleSubmit}
          innerRef={formikRef}
        >
          {({
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            errors,
            touched,
          }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setFieldValue("email", e.target.value);
                      setFieldTouched("email", true, false);
                    }}
                  />
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div className="text-red-500 text-xs my-2">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    name="password"
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setFieldValue("password", e.target.value);
                      setFieldTouched("password", true, false);
                    }}
                  />
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div className="text-red-500 text-xs my-2">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              <div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isSubmitting ? "Logging In..." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account yet?{" "}
          <a
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errorReducer,
});

export default connect(mapStateToProps, { login })(Login);
