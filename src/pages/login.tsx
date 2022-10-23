import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const Login = () => {
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={{
            username: "username",
            password: "password",
          }}
          onSubmit={(values) => {
            alert("Submitted");
          }}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
                Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
