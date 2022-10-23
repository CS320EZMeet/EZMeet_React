import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const SignUp = () => {
    return (
        <div className="col-md-12">
          <div className="card card-container">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />
            <Form>
                  <div>
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
  
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                  </div>
            </Form>
          </div>
        </div>
    );
}

export default SignUp;