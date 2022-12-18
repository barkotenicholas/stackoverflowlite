import React from "react";
import { useSelector } from "react-redux";
import styles from "./profile.module.css";

const Profile = () => {

  const { user: currentUser } = useSelector((state) => state.auth);


  return (
    <>
      <h2>Profile</h2>

      <div className={styles.ProfileDetails}>
        <p>FirstName ... {currentUser.firstname} </p>
        <p>LastName ... {currentUser.lastname}</p>
        <p>Email ... {currentUser.email}</p>
      </div>
      <div className={styles.ProfileInfo}></div>
    </>
  );
};

export default Profile;
