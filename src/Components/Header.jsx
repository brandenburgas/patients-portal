import React from "react";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.content}>
      <img
        src="./images/dhg_whole.png"
        alt="hospital-logo"
        className={styles.logo}
      />
    </header>
  );
};

export default Header;
