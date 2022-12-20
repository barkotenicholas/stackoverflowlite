import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import styles from "./ask.module.css";

const AskQuestion = ({ setIsOpen, handleSubmit }) => {
  const [question, setQuestion] = useState("");

  const isDisabled = question.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(question);
    setQuestion("");
    setIsOpen(false);
  };
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
            <form onSubmit={onSubmit}>
              <textarea
                className={styles.textbox}
                rows="5"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                cols="60"
                name="description"
                placeholder="Ask a question?"
              ></textarea>
              <div className={styles.actionsContainer}>
                <button
                  className={styles.cancelBtn}
                  disabled={isDisabled}
                >
                  Ask Question
                </button>
              </div>
            </form>
          </div>

          <div className={styles.modalActions}></div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
