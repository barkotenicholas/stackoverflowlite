import React, { CSSProperties } from "react";
import styles from "./answers.module.css";
import Comments from "../comment/Comments";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import AnswerForm from "../answers/AnswerForm";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAnswers,
  getSingleQuestion,
  addAnswer,
} from "../../redux/slices/answers.slice";
import { VoteAnswer } from "../../redux/slices/votes.slice";

import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Answers = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let [color, setColor] = useState("#ffffff");

  if (!currentUser) navigate("/");

  const { id } = useParams();
  const { userid } = useParams();
  console.log(userid);
  useEffect(() => {
    dispatch(getSingleQuestion(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAnswers(id));
  }, []);

  const [display, setDisplay] = useState(-1);

  const toggleElement = (currentIndex) => {
    // Check if the element that is clicked is already open
    if (currentIndex === display) {
      setDisplay(-1); // If it is already open, close it.
    } else {
      setDisplay(currentIndex); // else open the clicked element
    }
  };

  const answers = useSelector((state) => state.answer);
  const info = useSelector((state) => state.answer.questionAsked);
  const loading = useSelector((state) => state.answer.loading);

  const addAnswers = (answer) => {
    console.log(answer);
    const postAnswer = {
      questionid: id,
      uid: currentUser.id,
      answer: answer,
      upvote: 0,
      downvote: 0,
    };
    console.log(postAnswer);
    dispatch(addAnswer(postAnswer));
  };
  return (
    <div className={styles.body}>
      <h2 className={styles.questionHead}>
        {info ? <p>{info.question}</p> : <p>Questiion not availale</p>}
      </h2>
      {info ? (
        <>
          <p className={styles.firstname}>Author ~ {info.firstname} </p>
          <span className={styles.date}>{info.date}</span>
        </>
      ) : (
        <p>Author not availale</p>
      )}
      <div className={styles.breakline}></div>
      {loading && (
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {answers.answers.length > 0 ? (
        <>
          {answers.answers.map((a, index) => (
            <div key={a.id}>
              <div className={styles.answer}>
                <div className={styles.arrow}>
                  <MdArrowDropUp size={70} className={styles.up} onClick={()=>{
                    const vote= {
                       answer_id:a.id ,
                       user_id:currentUser.id,
                       like:1,
                       dislike:0
                    }
                    dispatch(VoteAnswer(vote));
                    dispatch(fetchAnswers(id));
                  }}/>
                  <MdArrowDropDown size={70} className={styles.up} onClick={()=>{
                      const vote= {
                        answer_id:a.id ,
                        user_id:currentUser.id,
                        like:0,
                        dislike:1
                     }
                     dispatch(VoteAnswer(vote));
                     dispatch(fetchAnswers(id));

                  }} />
                </div>

                <div>
                  <p className={styles.answertitle}>{a.answer}</p>
                  <p className={styles.author}>Answered by ~{a.firstname}</p>
                </div>
                <div>
                  <div className={styles.vote}>
                    <p className={styles.votes}>Up Votes {a.TotalLikes}</p>
                    <p className={styles.votes}>Down Votes {a.TotalDislikes}</p>
                  </div>
                  <div>
                    <button
                      className={styles.cmtbtn}
                      onClick={() => {
                        toggleElement(index);
                      }}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
              {display === index ? (
                <>
                  <Comments answer_id={a.id} />
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </>
      ) : (
        <p>No answers provided</p>
      )}

      <div className={styles.answerForm}>
        <AnswerForm handleSubmit={addAnswers} />
      </div>
    </div>
  );
};

export default Answers;
