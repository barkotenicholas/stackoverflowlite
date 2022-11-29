import styles from "./comment.module.css";

const Comment = ({comment}) => {
  return (
    <div className={styles.comment}>{comment.body}</div>
  )
}

export default Comment