import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import styles from "./ask.module.css";

const AskQuestion = ({ setIsOpen, handleSubmit ,edit }) => {
  const initialValue={question:""}
  if (edit !== undefined) {

    initialValue.question = edit.question;
    initialValue.id=edit.id;

  }else{
    initialValue.question = ""
  }
  const [question, setQuestion] = useState(initialValue);

  const isDisabled = initialValue.question.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    if (question.question===""){

    }else{
      handleSubmit(question);
      setQuestion("");
      setIsOpen(false);
    }
  
  };

  const updateData = e =>{
    setQuestion({...question ,question:e.target.value})

  }
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
                value={question.question}
                onChange={(e) => updateData(e)}
                cols="60"
                name="description"
                placeholder="Ask a question?"
              ></textarea>
              <div className={styles.actionsContainer}>
                <button
                  className={styles.cancelBtn}
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
