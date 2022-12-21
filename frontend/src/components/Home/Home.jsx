import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import { GoSearch } from "react-icons/go";
import AskQuestion from "../AskQuestion/AskQuestion";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestions,
  askQuestion,
  getQuestionsWithDate,
  getMostAnsweredQuestion,
  getTotalQuestion,
  searchQueryQuestion,
} from "../../redux/slices/question.slice";
import { useNavigate } from "react-router-dom";
import { getDate } from "./HomeHelper";
import { clearMessage } from "../../redux/slices/message.slice";
import ClipLoader from "react-spinners/ClipLoader";
import { IoFilterSharp } from "react-icons/io5";

const override = {
  display: "flex",
  flexdirection: "row",
  justifycontent: "center",
  alignItem: "center",
  margin: "0 auto",
  borderColor: "red",
};

export const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [searchParams, setSearchParams] = useSearchParams();
  let [color, setColor] = useState("#ffffff");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(false);
  const questionsAsked = useSelector((state) => state.questions);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [radio, setRadio] = useState("All");
 

  if (!currentUser) {
    navigate("/");
  }
  useEffect(() => {
    dispatch(
      getQuestions({
        pageno: 1,
        pagesize: 4,
      })
    );
    dispatch(getTotalQuestion());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = (question) => {
    let newdate = getDate();
    const Question = {
      question: question.question,
      date: newdate,
    };
    dispatch(askQuestion(Question));
  };

  if(search === null){

  }

  const totalQuestions = questionsAsked.total;
  const totalPages = Math.ceil(totalQuestions?.total / limit);
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      dispatch(
        getQuestions({
          pageno: page + 1,
          pagesize: limit,
        })
      );
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      dispatch(
        getQuestions({
          pageno: page - 1,
          pagesize: 4,
        })
      );
    }
  };

  const onFilterChange = (e) => {
    setRadio(e.target.value)
    if (e.target.value === "All") {
      dispatch(
        getQuestions({
          pageno: 1,
          pagesize: 4,
        })
      );
    }
    if (e.target.value === "Recent") {
      dispatch(getQuestionsWithDate());
    }
    if (e.target.value === "Answered") {
      dispatch(getMostAnsweredQuestion());
    }
  };



  const handleQuery = () => {

    setSearchParams({ question: search });

    if(search===""){
      dispatch(
        getQuestions({
          pageno: 1,
          pagesize: 4,
        })
      );
    }else{
      dispatch(searchQueryQuestion(search))
     
    }


  };
  const handleSearch = e =>{
    setSearchParams({ question: e.target.value });
    setSearch(e.target.value)
  }
  return (
    <>
      <div>
        <div className={styles.home}>
          <div className={styles.searchBox}>
            <GoSearch
              className={styles.search}
              size={40}
              onClick={handleQuery}
            />
            <input
              type="text"
              name=""
              className={styles.searchInput}
              value={searchParams.get("question")}
              onChange={(e) => handleSearch(e)}
            />
          </div>

          <div className={styles.topbar}>
            <p className={styles.headerText}>Questions ....</p>
            <button onClick={() => setIsOpen(true)} className={styles.askbtn}>
              Ask Question
            </button>
          </div>
          <div className={styles.filters}>
            <span className={styles.filterHead}>
              Filters:{" "}
              <IoFilterSharp onClick={() => setFilters((prev) => !prev)} />{" "}
            </span>
            {filters && (
              <div className={styles.filterbody}>
                <div className={styles.radio}>
                  <input
                    className={styles.radioinput}
                    defaultChecked
                    type="radio"
                    value="All"
                    name="filter"
                    id="all"
                    onChange={(e) => onFilterChange(e)}
                  />
                  <label className={styles.label} htmlFor="all">
                    All
                  </label>
                  <input
                    className={styles.radioinput}
                    type="radio"
                    value="Recent"
                    name="filter"
                    id="recent"
                    onChange={(e) => onFilterChange(e)}
                  />
                  <label className={styles.label} htmlFor="recent">
                    Most Recent
                  </label>
                  <input
                    className={styles.radioinput}
                    type="radio"
                    value="Answered"
                    name="filter"
                    id="answered"
                    onChange={(e) => onFilterChange(e)}
                  />
                  <label className={styles.label} htmlFor="answered">
                    Most Answered
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className={styles.breakline}></div>

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
            <>
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

             { radio === "All" && (
               <div className={styles.pagination}>
               <button
                 className={styles.likebtn}
                 onClick={handlePrevPage}
                 disabled={page === 1}
               >
                 Prev
               </button>
               <span>{page}</span>
               Out of
               <span>{totalPages}</span>
               <button
                 className={styles.likebtn}
                 onClick={handleNextPage}
                 disabled={page === totalPages}
               >
                 Next
               </button>
             </div>
             )

             }
            </>
          )}
        </div>
        {isOpen && (
          <AskQuestion setIsOpen={setIsOpen} handleSubmit={handleSubmit} />
        )}
      </div>
    </>
  );
};

export default Home;
