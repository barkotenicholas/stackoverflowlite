import styles from "./comment.module.css";

const Comment = ({ comment }) => {
  return (
    <div  className={styles.comment}>
      <div>{comment.comment}  <span className={styles.author} >~ {comment.firstname}</span></div>
    </div>
  );
};

export default Comment;
 