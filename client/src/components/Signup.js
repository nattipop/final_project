import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { signup } from "../actions";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    
  }
  
  const handleSignup = (formValues) => {
    dispatch(signup(formValues))
    navigate("/")
  }
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required."),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().when("password", (password, schema) => {
      return schema.test({
        test: confirmPassword => password === confirmPassword,
        message: "Passwords do not match"
      })
    }),
    first: Yup.string().required("First Name is required"),
    last: Yup.string().required("Last Name is required"),
    birthdate: Yup.date(),
    employee_pin: Yup.number()
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSignup}
    >
      <Form>
        <div style={{ "width": "8%", "float": "right", "marginTop": "-90px"}}>
          <div className="nav-item" onClick={() => navigate("/")}>Home</div>
        </div>
        <div className="container signup-container">
          <div>
            <label className="signup-label">Email</label>
            <Field className="form-control form-item" name="email" type="text" placeholder="Email" />
            <ErrorMessage className="error-message" name="email" component="div" />
          </div>
          <div>
            <label className="signup-label">Password:</label>
            <Field className="form-control form-item" name="password" type="password" placeholder="Password" />
            <ErrorMessage className="error-message" name="password" component="div" />
          </div>
          <div>
            <label className="signup-label">Confirm Password:</label>
            <Field className="form-control form-item" name="confirmPassword" type="password" placeholder="Confirm Password" />
            <ErrorMessage className="error-message" name="confirmPassword" component="div" />
          </div>
          <div>
            <label className="signup-label">First Name:</label>
            <Field className="form-control form-item" name="first" type="text" placeholder="First Name" />
            <ErrorMessage className="error-message" name="first" component="div" />
          </div>
          <div>
            <label className="signup-label">Last Name:</label>
            <Field className="form-control form-item" name="last" type="text" placeholder="Last Name" />
            <ErrorMessage className="error-message" name="last" component="div" />
          </div>
          <div>
            <label className="signup-label">Birthday:</label>
            <Field className="form-control form-item" name="birthdate" type="date" placeholder="Birthday" />
            <ErrorMessage className="error-message" name="birthdate" component="div" />
          </div>
          <p className="emp-pin">If you are an employee, enter employee pin here:</p>
          <div>
            <Field className="form-control form-item" name="employee_pin" type="number" placeholder="Pin" />
            <ErrorMessage className="error-message" name="employee_pin" component="div" />
          </div>
          <div className="signin-button-div">
            <button className="form-item signin-button" type="submit" >
              <span>Signup</span>
            </button>
          </div>
        </div>
        <p className="text-center sign-up-in">
          Already a member?  <span onClick={() => navigate("/account/signin")}>signin</span>
        </p>
      </Form>
    </Formik>
  )
}

export default Signup;