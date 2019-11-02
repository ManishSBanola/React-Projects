import React from "react";
import Header from "./Header/header";
import history from "./history";
import { Route, Router } from "react-router-dom";
import NewMatches from "./NewMatches/NewMatches";
import "././App.scss";
const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <main>
          <Route path="/" exact component={NewMatches} />
        </main>
      </Router>
    </div>
  );
};

export default App;
