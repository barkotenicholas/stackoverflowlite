import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useState } from "react";
import {
  deleteSingleQuestion,
  editQuiz,
  getAllUserQuestion,
} from "../../redux/slices/question.slice";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { getDate } from "../Home/HomeHelper";
import AskQuestion from "../AskQuestion/AskQuestion";

const override = {
  display: "flex",
  flexdirection: "row",
  justifycontent: "center",
  alignItem: "center",
  margin: "0 auto",
  borderColor: "red",
};
export const Profile = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState();
  const { user: currentUser } = useSelector((state) => state.auth);
  let [color, setColor] = useState("#ffffff");
  if (!currentUser) {
    navigate("/");
  }
  useEffect(() => {
    dispatch(getAllUserQuestion(currentUser.id));
  }, [dispatch, currentUser.id]);

  const questionsAsked = useSelector((state) => state.questions);

  const deleteUserQuestion = (question_id) => {
    dispatch(deleteSingleQuestion(question_id));
  };

  const handleSubmit = (question) => {
    
    dispatch(editQuiz({question,currentUser}));

  };

  const openEdit = (question) => {
    setEdit(question);

    setIsOpen(true);
  };

  return (
    <>
      <h2>Profile</h2>

      <div className={styles.ProfileDetails}>
        <p>FirstName ... {currentUser.firstname} </p>
        <p>LastName ... {currentUser.lastname}</p>
        <p>Email ... {currentUser.email}</p>
      </div>
      <div className={styles.ProfileInfo}>
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
              {questionsAsked.questions.length > 0 ? (
                questionsAsked.questions.map((question, index) => (
                  <div className={styles.questions} key={index}>
                    <div>
                      <p className={styles.question}>{question.question} </p>
                      <p>{question.qdate}</p>
                    </div>
                    <div className={styles.icon}>
                      <RiDeleteBin2Fill
                        size={20}
                        className={styles.deleteicon}
                        onClick={() => deleteUserQuestion(question.id)}
                      />
                      <FaEdit
                        className={styles.editicon}
                        size={20}
                        onClick={() => openEdit(question)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No questions asked by you </p>
              )}
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <AskQuestion
          setIsOpen={setIsOpen}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      )}
    </>
  );
};
