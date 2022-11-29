import React, { useState } from "react";
import styles from "./home.module.css";
import { GoSearch } from "react-icons/go";
import AskQuestion from "../AskQuestion/AskQuestion";
import { Link } from "react-router-dom";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.home}>
      <div className={styles.searchBox}>
        <GoSearch className={styles.search} size={40} />
        <input type="text" name="" className={styles.searchInput} />
      </div>

      <div className={styles.topbar}>
        <p className={styles.headerText}>Questions ....</p>
        <button onClick={() => setIsOpen(true)} className={styles.askbtn}>
          Ask Question
        </button>
      </div>

      <div className={styles.breakline}></div>

      <Link to={"/answers"} className={styles.link}>
        <div className={styles.questions}>
          <p className={styles.question}>How do you reverse an array ?</p>
          <p className={styles.author}>Asked by John doe</p>
        </div>
      </Link>

      {isOpen && <AskQuestion setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Home;
