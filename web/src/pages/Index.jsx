import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { update } from "../../redux/actions/auth";
import { Formik, Form, ErrorMessage } from "formik";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { updateFormSchema } from "../../schema/schema";

const Index = ({ update, errors, user }) => {
  const navigate = useNavigate();
  const formikRef = useRef(null);

  const initialValues = {
    name: user?.name,
    email: user?.email,
    type: user?.type,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await update(values);
    setSubmitting(false);
  };

  useEffect(() => {
    formikRef.current.setFieldValue("name", user?.name);
    formikRef.current.setFieldValue("email", user?.email);
    formikRef.current.setFieldValue("type", user?.type);
  }, [user]);

  useEffect(() => {
    if (errors) formikRef.current.setErrors(errors);
  }, [errors]);

  return (
    <div className="border p-5 space-y-4">
      <h1>Edit Information</h1>
      <Alert />
      <Formik
        initialValues={initialValues}
        validationSchema={updateFormSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ isSubmitting, setFieldValue, setFieldTouched, values }) => (
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  name="name"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={values?.name}
                  onChange={(e) => {
                    setFieldValue("name", e.target.value);
                    setFieldTouched("name", true, false);
                  }}
                />
                <ErrorMessage name="name">
                  {(msg) => (
                    <div className="text-red-500 text-xs my-2">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
            </div>

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
                  value={values?.email}
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
                  User Type
                </label>
              </div>
              <div className="mt-2">
                <select
                  name="type"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={values?.type}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    setFieldTouched("type", true, false);
                  }}
                >
                  <option value="">-- select --</option>
                  <option value="Seller">Seller</option>
                  <option value="Customer">Customer</option>
                </select>
                <ErrorMessage name="type">
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
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

Index.propTypes = {
  update: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errorReducer,
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { update })(Index);
