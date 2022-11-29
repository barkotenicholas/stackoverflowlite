import React from "react";
import { useState } from "react";
import styles from "./signup.module.css";
const SignUp = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rpass: "",
  };

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    rpass: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const register = (event) => {
    event.preventDefault();

    if (validate()) {
    }
  };

  const validate = () => {
    if (formValues.name.length === 0) {
      setFormErrors({ ...formErrors, name: "name field is empty" });
      return false;
    }
    if (formValues.email.length === 0) {
      setFormErrors({ ...formErrors, email: "Email field is empty" });
      return false;
    }
    if (!EMAIL_REGEX.test(formValues.email)) {
      setFormErrors({
        ...formErrors,
        email: "Please input the right email format",
      });

      return false;
    }
    if (formValues.password.length === 0) {
      setFormErrors({
        ...formErrors,
        password: "Please input the right email format",
      });
      return false;
    }

    if (!PWD_REGEX.test(formValues.password)) {
      setFormErrors({
        ...formErrors,
        password: "Please input the right password format",
      });
      return false;
    }
    if (formValues.password !== formValues.rpass) {
      setFormErrors({ ...formErrors, password: "passwords do not match" });
      setFormErrors({ ...formErrors, rpass: "passwords do not match" });
      return false;
    }
    return true;
  };

  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <h4 className={styles.registerHeader}>Register Here</h4>
        <div className={styles.contentBody}>
          <div>
            <p className={styles.label}>Enter Name</p>
            <input
              className={styles.input}
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Enter Name "
            ></input>
            {formErrors.name && (
              <>
                <p className={styles.error}>{formErrors.name}</p>
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
          <button className={styles.registerbtn} onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
