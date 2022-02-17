import React from "react";
import styles from "./App.module.less";
import { RouteBox } from "./Router";

const App = () => {
  return <div className={styles.App}>{<RouteBox />}</div>;
};

export default App;
