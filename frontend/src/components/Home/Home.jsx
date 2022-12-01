import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import { GoSearch } from "react-icons/go";
import AskQuestion from "../AskQuestion/AskQuestion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../redux/slices/question.slice";

const Home = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  
  const questionsAsked = useSelector((state)=>state.questions.questions)

  console.log(questionsAsked);

  const handleSubmit = (question) => {
    console.log(question);
  };

  useEffect(() => {
    dispatch(getQuestions("question"))
  },[dispatch]);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.searchBox}>
          <GoSearch className={styles.search} size={40} />
          <input type="text" name="" className={styles.searchInput} />
        </div>

        <div className={styles.topbar}>
          <p className={styles.headerText}>Questions ....</p>
          <button onClick={() => setIsOpen(true)} className={styles.askbtn}>
            Ask Question
          </button>
        </div>

        <div className={styles.breakline}></div>

        {questionsAsked ? (
          questionsAsked.map((question, index) => (
            <Link to={"/answers"} className={styles.link} key={index}>
              <div className={styles.questions}>
                <p className={styles.question}>{question.question}</p>
                <p className={styles.author}>Asked by {question.author}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No questions asked </p>
        )}
      </div>
      {isOpen && (
        <AskQuestion setIsOpen={setIsOpen} handleSubmit={handleSubmit} />
      )}
    </>
  );
};

export default Home;
