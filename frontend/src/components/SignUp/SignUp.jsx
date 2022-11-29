import React from "react";
import styles from "./signup.module.css";
const SignUp = () => {
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
              placeholder="Enter Name "
            ></input>
            <p className={styles.label}>Enter Email</p>
            <input
              className={styles.input}
              name="email"
              placeholder="Enter Email "
            ></input>
            <p className={styles.label}>Enter Password</p>
            <input
              className={styles.input}
              name="password"
              placeholder="Enter password "
            ></input>
            <p className={styles.label}>Repeat Password</p>
            <input
              className={styles.input}
              name="rpass"
              placeholder="Repeat Password"
            ></input>
          </div>
          <div>
            <button className={styles.registerbtn}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
