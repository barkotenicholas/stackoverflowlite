import { useEffect, useState } from "react";
import styles from "./comment.module.css";

import { getComments as getCommentsApi } from "../../api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
const Comments = () => {
  const [backendComment, setBackendComment] = useState([]);
  const addComment = (text, pid) => {
    console.log("Add comment");
  };
  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComment(data);
    });
  }, []);

  return (
    <div>
      <div className={styles.commentBody}>
        {backendComment.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <CommentForm onSubmit={addComment} submitLabel="Add Comment" />
      </div>
    </div>
  );
};

export default Comments;
