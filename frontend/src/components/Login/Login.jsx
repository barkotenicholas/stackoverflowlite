import styles from "./login.module.css";
export const Login = () => {
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
            placeholder="Enter email?"
          ></input>
          <input
            className={styles.password}
            name="password"
            placeholder="Enter password?"
          ></input>
          <p className={styles.terms} >By login in you agree to out terms and conditions</p>
           <button className={styles.loginbtn}>
            LOGIN
            </button> 
        </div>
      </div>
    </>
  );
};
