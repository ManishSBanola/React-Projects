import React from "react";
import Header from "./Header/header";
import history from "./history";
import { Route, Router } from "react-router-dom";
import NewMatches from "./NewMatches/NewMatches";
import MatchDetails from "./MatchDetails/MatchDetails";
import CssBaseline from "@material-ui/core/CssBaseline";
import "././App.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import {
  useTheme,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import DesignDialog from "./Dialog/DesignDialog";

const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        transition: " all 0.25s linear"
      }
    },
    MuiPaper: {
      elevation2: {
        backgroundColor: "#2b2a2a",
        transition: " all 0.25s linear"
      }
    },
    MuiButton: {
      textPrimary: {
        color: "white",
        transition: " all 0.25s linear"
      }
    }
  },
  palette: {
    type: "dark",
    primary: { main: grey[800] },
    secondary: { main: "#6270bf" },
    transition: " all 0.25s linear",
    background: {
      default: "#2b2a2a"
    }
  }
});

const App = props => {
  return (
    <ThemeProvider theme={props.darkMode ? theme : null}>
      <CssBaseline />
      <div>
        <Router history={history}>
          <Header />
          <Paper elevation="2" className="app-container">
            <Route path="/" exact component={NewMatches} />
            <Route path="/MatchDetails/:id" exact component={MatchDetails} />
            <DesignDialog />
          </Paper>
        </Router>
      </div>
    </ThemeProvider>
  );
};
const mapStateToProps = state => {
  return { darkMode: state.NewMatches.dark };
};

export default connect(mapStateToProps)(App);
