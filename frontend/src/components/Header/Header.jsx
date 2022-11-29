import styles from "./header.module.css";

import { ImStackoverflow } from "react-icons/im";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerIcon}>
        <ImStackoverflow size={40} />
        <p className={styles.headerText}>
        StackOverFlow Lite
        </p>
      </div>
    </div>
  );
};

export default Header;
