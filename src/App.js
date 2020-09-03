import { hot } from "react-hot-loader";
import React, { Component } from "react";
import styles from "./App.module.css";
import data from "./data/content.json";
import { Layout } from "./components";

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Layout data={data} />
      </div>
    );
  }
}

export default hot(module)(App);
