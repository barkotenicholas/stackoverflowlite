import styles from "./comment.module.css";

const Comment = ({comment}) => {
  return (
    <div className={styles.comment}>{comment.comment}</div>
  )
}

export default Comment