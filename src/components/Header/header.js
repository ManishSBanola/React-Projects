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
import { alterSearchType } from "../../Actions/index";
import history from "../history";

const Header = props => {
  const matches = useMediaQuery("(min-width:768px)");
  debugger;
  console.log({ matches });
  const { hideSearchMenu } = props;

  const searchField =
    typeof hideSearchMenu == "object"
      ? window.location.pathname == "/"
        ? "team"
        : "player"
      : hideSearchMenu
      ? "team"
      : "player";

  const [searchType, setSearchType] = useState(searchField);
  const [searchValue, setSearchValue] = useState(null);
  const [toggleHeaderList, setToggleHeaderList] = useState(false);
  const [enableAutoSuggest, setEnableAutoSuggest] = useState(
    !(window.location.pathname == "/")
  );

  useEffect(() => {
    setSearchType(searchField);
    setSearchValue("");
    setEnableAutoSuggest(!(window.location.pathname == "/"));
  }, [hideSearchMenu]);

  useEffect(() => {
    setToggleHeaderList(matches);
  }, [matches]);

  const toggleHeader = () => {
    setToggleHeaderList(!toggleHeaderList);
  };

  const resetSearchValue = () => {
    setSearchValue(null);
  };

  useEffect(() => {
    if (
      document.querySelector(".list-header") &&
      window.location.pathname != "/"
    ) {
      let listHeader = document.querySelector(".list-header");
      listHeader.classList.add("grid-header-list-match-details");
      listHeader.classList.remove("list-header");
    }
  }, [toggleHeaderList]);

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
    props.alterSearchType(window.location.pathname == "/");
    debugger;
    if (window.location.pathname != "/") {
      let gridHeader = document.querySelector(" .grid-header");
      gridHeader.classList.add("grid-header-match-details");
      gridHeader.classList.remove("grid-header");
    }
  }, []);

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
  const toggleShowSelect = showMenu => {
    if (showMenu) {
      return (
        <ListItem>
          <FormControl variant="filled" className="input-search-type" fullWidth>
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
      );
    } else {
      return null;
    }
  };
  return (
    <AppBar className="app-header">
      <ToolBar id="grid-header" className="grid-header">
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
          {toggleHeaderList ? (
            <CSSTransition timeout={300} classNames="item">
              <List className="list-header" id="list-header">
                {toggleShowSelect(props.hideSearchMenu)}

                <Paper className="container-bg">
                  <Search
                    SearchInputProps={
                      searchType == "team"
                        ? SearchInputProps[0]["team"]
                        : SearchInputProps[0]["player"]
                    }
                    resetValue={searchValue}
                    resetCallback={resetSearchValue}
                    // searchType={searchType}
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
  return { darkMode: state.NewMatches.dark, hideSearchMenu: state.searchType };
};
export default connect(mapStateToProps, { toggleDarkMode, alterSearchType })(
  Header
);
