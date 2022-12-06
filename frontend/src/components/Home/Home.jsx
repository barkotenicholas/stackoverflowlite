import React, { useState, useEffect ,CSSProperties} from "react";
import styles from "./home.module.css";
import { GoSearch } from "react-icons/go";
import AskQuestion from "../AskQuestion/AskQuestion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions ,askQuestion } from "../../redux/slices/question.slice";
import { useNavigate } from "react-router-dom";
import { getDate } from "./HomeHelper";
import { clearMessage } from "../../redux/slices/message.slice";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let [color, setColor] = useState("#ffffff");

  const [isOpen, setIsOpen] = useState(false);
  
  const questionsAsked = useSelector((state)=>state.questions)
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  console.log(currentUser);
  console.log(message);

  if (!currentUser) {
    navigate('/')
  }
  useEffect(() => {
    dispatch(getQuestions("question"))
  },[dispatch]);

  const handleSubmit = (question) => {
    let newdate = getDate();
    const id = currentUser.id
    const Question ={
      user_id:id,
      question:question,
      date:newdate
    }

    dispatch(askQuestion(Question))
    dispatch(getQuestions("question"))

  };

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

        {questionsAsked.questions ? (
          questionsAsked.questions.map((question, index) => (
            <Link to={`/answers/${question.id},${question.user_id}`} className={styles.link} key={index}>
              <div className={styles.questions}>
                <p className={styles.question}>{question.question}</p>
                <p className={styles.author}>Asked by {question.firstname}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No questions asked </p>
        )}
        {questionsAsked.loading &&    <ClipLoader
        color={color}
        loading={questionsAsked.loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />}
      </div>
      {isOpen && (
        <AskQuestion setIsOpen={setIsOpen} handleSubmit={handleSubmit} />
      )}
    </>
  );
};

export default Home;
