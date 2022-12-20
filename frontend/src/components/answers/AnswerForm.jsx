import React from "react";
import { useState } from "react";
import styles from "./answers.module.css";
const AnswerForm = ({ handleSubmit }) => {
  const [answer, setAnswer] = useState("");
  const isSubmitDisabled = answer.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(answer);
    setAnswer("");
  };
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <textarea
      placeholder="Answer This Question"
        className={styles.textbox}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button className={styles.submitbtn} disabled={isSubmitDisabled}>
        Add Answer
      </button>
    </form>
  );
};

export default AnswerForm;
