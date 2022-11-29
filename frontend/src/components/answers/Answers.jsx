import React from "react";
import styles from "./answers.module.css";
import Comments from "../comment/Comments";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import AnswerForm from "../answers/AnswerForm";

import { useState } from "react";
const Answers = () => {
  const [open, setOpen] = useState(false);
  const addAnswer = (answer,uid)=>{

}
  return (
    <div className={styles.body}>
      <h2 className={styles.questionHead}>How do you reverse an array ?</h2>
      <div className={styles.breakline}></div>

      <div className={styles.answer}>
        <div className={styles.arrow}>
          <BiUpArrow className={styles.up} />
          <BiDownArrow className={styles.up} />
        </div>

        <div>
          <p className={styles.answertitle}>
            You can use the arrays reverse method
          </p>
          <p className={styles.author}>Answered by Mike row </p>
        </div>
        <div>
          <div className={styles.vote}>
            <p>Up Votes</p>
            <p>Down Votes</p>
          </div>
          <div>
            <button className={styles.cmtbtn} onClick={()=>setOpen(prev => !prev)}>Comment</button>
          </div>
        </div>
      </div>
      {open && <Comments />}

      <AnswerForm className={styles.answerForm} handleSubmit={addAnswer} />
    </div>
  );
};

export default Answers;
