import React from "react";
import Header from "./Header/header";
import history from "./history";
import { Route, Router } from "react-router-dom";
import Search from "./Search/Search";
import "././App.scss";
const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <main>
          <Route path="/" exact component={Search} />
        </main>
      </Router>
    </div>
  );
};

export default App;
