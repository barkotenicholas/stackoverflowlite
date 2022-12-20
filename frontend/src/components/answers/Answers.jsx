import React from "react";
import styles from "./answers.module.css";
import Comments from "../comment/Comments";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { IoShieldCheckmark } from "react-icons/io5";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAnswers,
  getSingleQuestion,
  addAnswer,
  markPreferred,
} from "../../redux/slices/answers.slice";
import {
  downVoteAnswer,
  upVoteAnswer,
  VoteAnswer,
} from "../../redux/slices/votes.slice";

import ClipLoader from "react-spinners/ClipLoader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const Answers = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [color, setColor] = useState("#ffffff");
  const [value, setValue] = useState("");

  if (!currentUser) navigate("/");

  const { id } = useParams();
  useEffect(() => {
    dispatch(getSingleQuestion(id));
  }, [dispatch,id]);

  useEffect(() => {
    dispatch(fetchAnswers(id));
  }, [dispatch,id]);

  const [display, setDisplay] = useState(-1);

  const toggleElement = (currentIndex) => {
    if (currentIndex === display) {
      setDisplay(-1);
    } else {
      setDisplay(currentIndex);
    }
  };

  const modules = {
    toolbar: [
      ["bold", "italic"],
      ["link", "blockquote", "code-block", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  const answers = useSelector((state) => state.answer);
  const info = useSelector((state) => state.answer.questionAsked);
  const loading = useSelector((state) => state.answer.loading);

  const disabled = value.length === 0;
  const addAnswers = () => {
    const postAnswer = {
      questionid: id,
      answer: value,
    };
    dispatch(addAnswer(postAnswer));
    setValue("");
  };

  const handleChange = (answer_id) => {
    dispatch(markPreferred({ answer_id, id }));
    dispatch(fetchAnswers(id));
  };

  console.log(currentUser.id);
  
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
      {loading ? (
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          {answers.answers.length > 0 ? (
            <>
              {answers.answers.map((a, index) => (
                <div key={a.id} className={styles.answerbody}>
                  <div className={styles.answer}>
                    <div className={styles.answerhead}>
                      <div className={styles.arrow}>
                        <GoTriangleUp
                          size={70}
                          className={styles.up}
                          onClick={() => {
                            const vote = {
                              answer_id: a.id,
                            };
                            dispatch(upVoteAnswer(vote));
                            dispatch(fetchAnswers(id));
                          }}
                        />
                        <GoTriangleDown
                          size={70}
                          className={styles.up}
                          onClick={() => {
                            const vote = {
                              answer_id: a.id,
                            };
                            dispatch(downVoteAnswer(vote));
                            dispatch(fetchAnswers(id));
                          }}
                        />

                        {a.isPreferred && (
                          <IoShieldCheckmark
                            size={70}
                            className={styles.check}
                          />
                        )}
                      </div>
                      <div className={styles.endAnswer}>
                        <div className={styles.answertitle}>
                          {parse(a.answer)}
                        </div>
                        <p className={styles.author}>
                          Answered by ~{a.firstname}
                        </p>
                      </div>
                    </div>
                    <div className={styles.answerFooter}>
                      {currentUser.id === info.user_id && (
                        <label className={styles.checkPrefered}>
                          <input
                            type="checkbox"
                            defaultChecked={a.isPreferred}
                            onChange={() => handleChange(a.id)}
                          />
                          Mark Preferred
                        </label>
                      )}
                      <div> </div>
                      <div className={styles.details}>
                        <p className={styles.votes}>Up Votes {a.TotalLikes}</p>
                        <p className={styles.votes}>
                          Down Votes {a.TotalDislikes}
                        </p>
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
        </>
      )}

      <div className={styles.answerForm}>
        <ReactQuill
          theme="snow"
          modules={modules}
          value={value}
          onChange={setValue}
        />

        <button onClick={addAnswers} disabled={disabled}>
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default Answers;
