import { useState } from "react";
import styles from "./login.module.css";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [emailError, setEmailError] = useState({
    success: "",
    error: "",
  });
  const [passwordError, setPasswordError] = useState({
    success: "",
    error: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value.trim() });
  };

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      setEmailError({ ...emailError, success: "Success" });
      setPasswordError({ ...passwordError, success: "Success" });

    }
  };

  const validate = () => {
    if (formValues.email.length === 0) {
      setEmailError({ ...emailError, error: "Email field is empty" });
      return false;
    }
    if (!EMAIL_REGEX.test(formValues.email)) {
      setEmailError({
        ...emailError,
        error: "please input the right email format",
      });
      return false;
    }
    if (formValues.password.length === 0) {
      setPasswordError({ ...passwordError, error: "Password field is empty" });
      return false;
    }

    if (!PWD_REGEX.test(formValues.password)) {
      setPasswordError({ ...passwordError, error: "Password format is invalid" });
      return false;
    }
    return true;
  };
  return (
    <>
      <div className={styles.body}>
        <div className={styles.loginbody}>
          <p className={styles.loginHead}>Welcome Back...</p>
          <p className={styles.loginTitle}>
            Please Enter your email and password
          </p>
          <input
            className={styles.email}
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter email?"
          ></input>
            {emailError.error && (
              <>
                <p className={styles.error}>{emailError.error}</p>
              </>
            )}
            {emailError.success && (
              <>
                <span className={styles.success}>{emailError.success} <BsCheckCircleFill/></span>
              </>
            )}
          <input
            className={styles.password}
            value={formValues.password}
            onChange={handleChange}
            name="password"
            placeholder="Enter password?"
          ></input>
          {passwordError.error && (
            <>
              <p className={styles.error}>{passwordError.error}</p>
            </>
          )}
          {passwordError.success && (
            <>
              <span className={styles.success}>{passwordError.success} <BsCheckCircleFill/></span>
            </>
          )}
          <p className={styles.terms}>
            By login in you agree to out terms and conditions
            Do not have an account<Link to={'/register'}>Click to register</Link>
          </p>
          <button className={styles.loginbtn} onClick={handleLogin}>
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
};
