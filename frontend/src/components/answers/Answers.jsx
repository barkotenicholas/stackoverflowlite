import React from "react";
import styles from "./answers.module.css";
import Comments from "../comment/Comments";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import AnswerForm from "../answers/AnswerForm";
import { getAnswers } from "../../api";
import { useState } from "react";
import { useEffect } from "react";
const Answers = () => {
  const [open, setOpen] = useState();
  const [anwersUsers, setAnwerUsers] = useState([]);
  useEffect(() => {
    getAnswers().then((data) => {
      setAnwerUsers(data);
      let arr = new Array(data.length).fill(false);
      setOpen(arr);
    });
  }, []);

  const addAnswer = (answer, uid) => {};
  return (
    <div className={styles.body}>
      <h2 className={styles.questionHead}>How do you reverse an array ?</h2>
      <div className={styles.breakline}></div>

      {anwersUsers ? (
        anwersUsers.map((answer, index) => (
          <>
            <div className={styles.answer}>
              <div className={styles.arrow}>
                <BiUpArrow className={styles.up} />
                <BiDownArrow className={styles.up} />
              </div>

              <div>
                <p className={styles.answertitle}>{answer.answer}</p>
                <p className={styles.author}>Answered by {answer.author}</p>
              </div>
              <div>
                <div className={styles.vote}>
                  <p>Up Votes {answer.upvote}</p>
                  <p>Down Votes{answer.downvote}</p>
                </div>
                <div>
                  <button
                    className={styles.cmtbtn}
                    onClick={() => {
                      let newArr = [...open]
                      newArr[index] = !newArr[index]
                      setOpen(newArr)
                    }}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
            {open[index] && <Comments />}
          </>
        ))
      ) : (
        <p>No answers provided</p>
      )}

      <div className={styles.answerForm}>
        <AnswerForm handleSubmit={addAnswer} />
      </div>
    </div>
  );
};

export default Answers;
