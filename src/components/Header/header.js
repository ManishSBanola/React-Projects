import React from "react";
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

class header extends React.Component {
  state = { searchType: "team", enableAutoSuggest: false, searchValue: null };
  resetSearchValue = () => {
    this.setState({
      searchValue: null
    });
  };
  toggleSearch = e => {
    this.setState({
      searchType: e.target.value == 1 ? "team" : "player",
      searchValue: ""
    });

    if (!(e.target.value == 1)) {
      this.setState({ enableAutoSuggest: true });
    } else {
      this.setState({ enableAutoSuggest: false });
    }
  };

  toggleDarkTheme = e => {
    this.props.toggleDarkMode(e.target.checked);
    if (e.target.checked) {
      window.localStorage.setItem("theme", "dark");
    } else {
      window.localStorage.clear();
    }
  };
  componentDidMount() {
    this.props.toggleDarkMode(
      window.localStorage.getItem("theme") == "dark" ? true : false
    );
  }
  render() {
    const { searchType, enableAutoSuggest, searchValue } = this.state;
    const SearchInputProps = [
      {
        team: {
          placeholder: "Search for team",
          id: "team-search",
          label: "Team Search "
        },
        player: {
          placeholder: "Search for player",
          id: "player-search",
          label: "Player Search "
        }
      }
    ];

    return (
      <AppBar className="app-header">
        <ToolBar className="grid-header">
          <img alt="cricket ball icon" src={SvgCricketBall}></img>
          <Typography variant="h5">Cricket Plus</Typography>
          <List className="list-header">
            <ListItem>
              <FormControl
                variant="filled"
                className="input-search-type"
                fullWidth
              >
                <InputLabel id="label-search-type">Set Search Type</InputLabel>
                <Select
                  labelId="select-search-type"
                  id="select-search-type"
                  value={this.state.searchType == "team" ? 1 : 2}
                  onChange={this.toggleSearch}
                >
                  <MenuItem value={1}>Search By Team Name</MenuItem>
                  <MenuItem value={2}>Search By Player</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <Switch
                checked={this.props.darkMode || false}
                onChange={this.toggleDarkTheme}
                value={this.props.darkMode || false}
              />
            </ListItem>
            <Paper className="container-bg">
              <Search
                SearchInputProps={
                  searchType == "team"
                    ? SearchInputProps[0]["team"]
                    : SearchInputProps[0]["player"]
                }
                resetValue={searchValue}
                resetCallback={this.resetSearchValue}
                searchType={searchType}
                enableAutoSuggest={enableAutoSuggest}
              />
            </Paper>
          </List>
        </ToolBar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.NewMatches);
  return { darkMode: state.NewMatches.dark };
};
export default connect(
  mapStateToProps,
  { toggleDarkMode }
)(header);
