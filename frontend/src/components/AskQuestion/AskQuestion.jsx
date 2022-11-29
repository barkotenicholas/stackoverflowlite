import React from "react";
import { RiCloseLine } from "react-icons/ri";
import styles from "./ask.module.css";

const AskQuestion = ({ setIsOpen }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
          </div>
          <div className={styles.modalContent}>
          <textarea className={styles.textbox} rows = "5" cols = "60" name = "description">
            Ask Question ?
         </textarea>
          </div>

          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Ask Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
