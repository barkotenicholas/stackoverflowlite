import React from "react";
import { useState } from "react";
import styles from './comment.module.css';
const CommentForm = ({ handleSubmit, submitLabel }) => {
  const [comment, setComment] = useState("");
  const isSubmitDisabled = comment.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(comment);
    setComment('')
  };
  return (
    <form onSubmit={onSubmit}>
      <input className={styles.commentinput} value={comment} onChange={(e) => setComment(e.target.value)} />
      <button className={styles.commentsubmit} disabled={isSubmitDisabled}>{submitLabel}</button>
    </form>
  );
};

export default CommentForm;
