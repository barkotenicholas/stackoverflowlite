import { useEffect } from "react";
import styles from "./comment.module.css";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

import { postComment, getComments } from "../../redux/slices/comment.slice.js";
import { useDispatch, useSelector } from "react-redux";

const Comments = ({ answer_id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(answer_id));
  }, [dispatch, answer_id]);

  const comments = useSelector((state) => state.comments);
  const { user: currentUser } = useSelector((state) => state.auth);

  console.log(comments);

  const onSubmit = (text, pid) => {
    const comment = {
      answer_id: answer_id,
      user_id: currentUser.id,
      comment: text,
    };
    dispatch(postComment(comment));
  };
  return (
    <div>
      <div className={styles.commentBody}>
        {comments.comments.length > 0 ? (
          comments.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <p>Be the first to comment</p>
        )}
        <CommentForm onSubmitAnswer={onSubmit} submitLabel="Add Comment" />
      </div>
    </div>
  );
};

export default Comments;
