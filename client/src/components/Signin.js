import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { signin } from "../actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSignin}
    >
      <Form>
        <div className="container">
          <div>
            <Field className="form-control form-item" name="email" type="text" placeholder="Email" />
            <ErrorMessage className="error-message" name="email" component="div" />
          </div>
          <div>
            <Field className="form-control form-item" name="password" type="password" placeholder="Password" />
            <ErrorMessage className="error-message" name="password" component="div" />
          </div>
          <button className="form-item" type="submit" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Signin</span>
          </button>
        </div>
      </Form>
    </Formik>
  )
}

export default Signin;