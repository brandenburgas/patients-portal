import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

import styles from "../App.module.css";

const RootLayout = () => {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
