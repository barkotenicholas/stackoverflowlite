import styles from "./header.module.css";
import { ReactComponent as IconMenu } from "../../assets/headicon.svg";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowDropDownFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../redux/slices/auth.slice";
const Header = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(!open);
  };
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerIcon}>
        <IconMenu className={styles.icon} />
      </div>
      {currentUser && (
        <div className={styles.profile}>
          <button className={styles.dpbutton} onClick={handleOpen}>
            {currentUser.firstname} <RiArrowDropDownFill />
          </button>
          {open && (
            <div className={styles.dropdownContent}>
              <Link to={`/profile`} className={styles.link}>
                Profile
              </Link>
              <a onClick={handleLogout}>LogOut</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
