import React, { useState, useEffect } from "react";
import { AppBar } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ToolBar from "@material-ui/core/Toolbar";
import "./header.scss";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import SvgCricketBall from "../../assets/cricketball.svg";
import SearchIcon from "@material-ui/icons/Search";
import TimelineIcon from "@material-ui/icons/Timeline";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Search from "../Search/Search";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import { toggleDarkMode } from "../../Actions/index";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Header = props => {
  const matches = useMediaQuery("(min-width:768px)");
  console.log(matches, "matches");
  const [searchType, setSearchType] = useState("team");
  const [enableAutoSuggest, setEnableAutoSuggest] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [toggleHeaderList, setToggleHeaderList] = useState(matches);

  const toggleHeader = () => {
    setToggleHeaderList(!toggleHeaderList);
  };
  const resetSearchValue = () => {
    setSearchValue(null);
  };
  const toggleSearch = e => {
    setSearchType(e.target.value == 1 ? "team" : "player");
    setSearchValue("");

    if (!(e.target.value == 1)) {
      setEnableAutoSuggest(true);
    } else {
      setEnableAutoSuggest(false);
    }
  };

  const toggleDarkTheme = e => {
    props.toggleDarkMode(e.target.checked);
    if (e.target.checked) {
      window.localStorage.setItem("theme", "dark");
    } else {
      window.localStorage.clear();
    }
  };
  useEffect(() => {
    props.toggleDarkMode(
      window.localStorage.getItem("theme") == "dark" ? true : false
    );
  });

  const SearchInputProps = [
    {
      team: {
        placeholder: "Search for team",
        id: "team-search"
      },
      player: {
        placeholder: "Search for player",
        id: "player-search"
      }
    }
  ];

  return (
    <AppBar className="app-header">
      <ToolBar className="grid-header">
        <div className="grid-switch">
          <img alt="cricket ball icon" src={SvgCricketBall}></img>
          <Typography variant="h5">Cricket Plus</Typography>
          <Switch
            checked={props.darkMode || false}
            onChange={toggleDarkTheme}
            value={props.darkMode || false}
          />
          <MenuIcon className="menu" onClick={toggleHeader} />
        </div>
        <TransitionGroup>
          {toggleHeaderList || matches ? (
            <CSSTransition timeout={300} classNames="item">
              <List className="list-header" id="list-header">
                <ListItem>
                  <FormControl
                    variant="filled"
                    className="input-search-type"
                    fullWidth
                  >
                    <Select
                      labelId="select-search-type"
                      id="select-search-type"
                      value={searchType == "team" ? 1 : 2}
                      onChange={toggleSearch}
                    >
                      <MenuItem value={1}> Team Search</MenuItem>
                      <MenuItem value={2}> Player Search</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                <Paper className="container-bg">
                  <Search
                    SearchInputProps={
                      searchType == "team"
                        ? SearchInputProps[0]["team"]
                        : SearchInputProps[0]["player"]
                    }
                    resetValue={searchValue}
                    resetCallback={resetSearchValue}
                    searchType={searchType}
                    enableAutoSuggest={enableAutoSuggest}
                  />
                </Paper>
              </List>
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </ToolBar>
    </AppBar>
  );
};

const mapStateToProps = state => {
  console.log(state.NewMatches);
  return { darkMode: state.NewMatches.dark };
};
export default connect(mapStateToProps, { toggleDarkMode })(Header);
