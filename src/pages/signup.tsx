import React from "react";
import { Field, Form, ErrorMessage, Formik } from "formik";

const SignUp = () => {
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={{
            username: "username",
            email: "email",
            password: "password",
          }}
          onSubmit={(values) => {
            alert("Submitted");
          }}
        >
          <Form>

              <div className="form-group">
                <label htmlFor="username"> Username </label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email"> Email </label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"> Password </label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>
            
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
