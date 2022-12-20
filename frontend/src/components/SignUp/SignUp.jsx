import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register } from "../../redux/slices/auth.slice";
import { clearMessage } from "../../redux/slices/message.slice";
import styles from "./signup.module.css";
import { unwrapResult } from '@reduxjs/toolkit'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignUp = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [successful, setSuccessful] = useState(false);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    rpass: "",
  };
  


  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [formValues, setformValues] = useState(initialValues);
  const errors = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    rpass: "",
  };
  const [formErrors, setFormErrors] = useState(errors);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const registerNewUser = (event) => {
    if (validate()) {
      const newUser = {
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        email: formValues.email,
        password: formValues.password,
      };

      dispatch(register(newUser))
        .then(unwrapResult)
        .then((data) => {
          setSuccessful(true)
          navigate('/')
        })
        .catch((err) => {
          setSuccessful(false)
        });
    }
  };

  const validate = () => {
    if (formValues.firstname.length === 0) {
      setFormErrors({ firstname: "firstname field is empty" });
      return false;
    }
    if (formValues.lastname.length === 0) {
      setFormErrors({ lastname: "lastname field is empty" });
      return false;
    }
    if (formValues.email.length === 0) {
      setFormErrors({ email: "Email field is empty" });
      return false;
    }
    if (!EMAIL_REGEX.test(formValues.email)) {
      setFormErrors({
        email: "Please input the right email format",
      });

      return false;
    }
    if (formValues.password.length === 0) {
      setFormErrors({
        password: "Please input the right email format",
      });
      return false;
    }

    if (!PWD_REGEX.test(formValues.password)) {
      setFormErrors({
        password: "Please input the right password format",
      });
      return false;
    }
    if (formValues.password !== formValues.rpass) {
      setFormErrors({ password: "passwords do not match" });
      setFormErrors({ rpass: "passwords do not match" });
      return false;
    }
    return true;
  };

  return (
    <div className={styles.body}>
      <div className={styles.content}>
      {message && (
        <div >
          <div
            className={successful ? "success" : "danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}

        <h4 className={styles.registerHeader}>Register Here</h4>
        <div className={styles.contentBody}>
          <div>
            <p className={styles.label}>Enter First Name</p>
            <input
              className={styles.input}
              name="firstname"
              value={formValues.firstname}
              onChange={handleChange}
              placeholder="Enter First Name "
            ></input>
            {formErrors.firstname && (
              <>
                <p className={styles.error}>{formErrors.firstname}</p>
              </>
            )}
            <p className={styles.label}>Enter Last Name</p>
            <input
              className={styles.input}
              name="lastname"
              value={formValues.lastname}
              onChange={handleChange}
              placeholder="Enter Last Name "
            ></input>
            {formErrors.lastname && (
              <>
                <p className={styles.error}>{formErrors.lastname}</p>
              </>
            )}

            <p className={styles.label}>Enter Email</p>
            <input
              className={styles.input}
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter Email "
            ></input>
            {formErrors.email && (
              <>
                <p className={styles.error}>{formErrors.email}</p>
              </>
            )}

            <p className={styles.label}>Enter Password</p>
            <input
              className={styles.input}
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter password "
            ></input>
            {formErrors.password && (
              <>
                <p className={styles.error}>{formErrors.password}</p>
              </>
            )}

            <p className={styles.label}>Repeat Password</p>
            <input
              className={styles.input}
              name="rpass"
              value={formValues.rpass}
              onChange={handleChange}
              placeholder="Repeat Password"
            ></input>
            {formErrors.rpass && (
              <>
                <p className={styles.error}>{formErrors.rpass}</p>
              </>
            )}
          </div>
          <button className={styles.registerbtn} onClick={registerNewUser}>
            Register
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
