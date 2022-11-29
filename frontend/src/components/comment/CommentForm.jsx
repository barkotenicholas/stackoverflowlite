import React from "react";
import { useState } from "react";

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
      <input value={comment} onChange={(e) => setComment(e.target.value)} />
      <button disabled={isSubmitDisabled}>{submitLabel}</button>
    </form>
  );
};

export default CommentForm;
