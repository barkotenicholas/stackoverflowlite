import styles from "./header.module.css";

import { ImStackoverflow } from "react-icons/im";
import { ReactComponent as IconMenu } from '../../assets/headicon.svg';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerIcon}>
        <IconMenu className={styles.icon}/>
        
      </div>
    </div>
  );
};

export default Header;
