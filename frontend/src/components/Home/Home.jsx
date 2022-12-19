import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import { GoSearch } from "react-icons/go";
import AskQuestion from "../AskQuestion/AskQuestion";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, askQuestion } from "../../redux/slices/question.slice";
import { useNavigate } from "react-router-dom";
import { getDate } from "./HomeHelper";
import { clearMessage } from "../../redux/slices/message.slice";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "flex",
  flexdirection: "row",
  justifycontent: "center",
  alignItem: "center",
  margin: "0 auto",
  borderColor: "red",
};

const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams,setSearchParams]= useSearchParams()
  let [color, setColor] = useState("#ffffff");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const questionsAsked = useSelector((state) => state.questions);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  if (!currentUser) {
    navigate("/");
  }
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = (question) => {
    let newdate = getDate();
    const Question = {
      question: question,
      date: newdate,
    };
    dispatch(askQuestion(Question));
  };

  const handleQuery = ()=>{
    setSearchParams({question:search})
  }

  return (
    <>
      {questionsAsked.loading ? (
        <div className={styles.loader}>
          <ClipLoader
            color={color}
            loading={true}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <div className={styles.home}>
            <div className={styles.searchBox}>
              <GoSearch className={styles.search} size={40} onClick={handleQuery} />
              <input type="text" name="" className={styles.searchInput} value={searchParams.get('question')} onChange={(e)=> setSearch(e.target.value) } />
            </div>

            <div className={styles.topbar}>
              <p className={styles.headerText}>Questions ....</p>
              <button onClick={() => setIsOpen(true)} className={styles.askbtn}>
                Ask Question
              </button>
            </div>

            <div className={styles.breakline}></div>

            {questionsAsked.questions ? (
              questionsAsked.questions.map((question, index) => (
                <Link
                  to={`/answers/${question.id}`}
                  className={styles.link}
                  key={index}
                >
                  <div className={styles.questions}>
                    <p className={styles.question}>{question.question}</p>
                    <div className={styles.info}>
                      <p className={styles.author}>
                        Author ~ {question.firstname}
                      </p>
                      <p>{question.date}</p>
                    </div>
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
        </div>
      )}
    </>
  );
};

export default Home;
