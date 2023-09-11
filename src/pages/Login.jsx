import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import GoogleLoginButton from "../components/GoogleLoginButton";
import TokenService from "../services/token.service";
import { login } from "../services/auth.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("User Name is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    try {
      login(values.username, values.password).then(() => {
        navigate("/");
      });
    } catch (error) {
      alert("Invalid Details");
    }
  };

  useEffect(() => {
    if (TokenService.getAccessToken()) {
      navigate("/");
    } else if (TokenService.getGoogleUser()) {
      navigate("/");
    }
  });

  return (
    <div className="container max-w-md mx-auto bg-gray-100 border border-gray-900 rounded-md p-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                User Name
              </label>
              <Field
                type="username"
                id="username"
                name="username"
                className={`border rounded-lg px-3 py-2 w-full ${
                  errors.email && touched.email
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                placeholder="Enter your username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-600 mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className={`border rounded-lg px-3 py-2 w-full ${
                  errors.password && touched.password
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 mt-2"
              />
            </div>

            <div className="flex justify-center mt-2 w-full">
              <div className="w-full">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                >
                  {isSubmitting ? "Submitting" : "Login"}
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-2 w-full">
              <GoogleLoginButton />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
