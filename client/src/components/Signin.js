import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { signin } from "../actions";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import coffeeLoading from "../Coffee_Loading.gif"

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state;
  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required."),
    password: Yup.string().required("Password is required")
  });

  const handleSignin = (formValue) => {
    setLoading(true)
    dispatch(signin(formValue))
    navigate("/")
    setLoading(false)
  }

  const renderError = () => {
    return errorMessage ? (
      <p style={{"color": "white", "fontWeight": "bold", "textAlign": "center"}}>*{errorMessage}*</p>
    ) : ""
  }

  return loading ? (
    <img src={coffeeLoading} alt="loading" />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSignin}
    >
      <Form>
        <div className="container signin-container">
          {renderError()}
          <div>
            <Field className="form-control form-item" name="email" type="text" placeholder="Email" />
            <ErrorMessage className="error-message" name="email" component="div" />
          </div>
          <div>
            <Field className="form-control form-item" name="password" type="password" placeholder="Password" />
            <ErrorMessage className="error-message" name="password" component="div" />
          </div>
          <div className="signin-button-div">
            <button className="signin-button" type="submit" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Signin</span>
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default Signin;