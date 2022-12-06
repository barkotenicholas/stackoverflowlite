import React from "react";
import { useState } from "react";
import styles from './comment.module.css';
const CommentForm = ({ onSubmitAnswer }) => {
  const [comment, setComment] = useState("");
  const isSubmitDisabled = comment.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    setComment('')
    onSubmitAnswer(comment);
  };
  return (
    <form onSubmit={onSubmit}>
      <input className={styles.commentinput} placeholder='Comment here' value={comment} onChange={(e) => setComment(e.target.value)} />
      <button className={styles.commentsubmit} disabled={isSubmitDisabled}>Add Comment</button>
    </form>
  );
};

export default CommentForm;
