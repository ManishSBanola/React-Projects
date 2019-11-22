import NewMatches from "../NewMatches/NewMatches";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import {
  searchMatch,
  getPlayerByName,
  fetchPlayerInfo
} from "../../Actions/index";
import "./Search.scss";
import { Link } from "react-router-dom";
import history from "../history";
import DesignDialog from "../Dialog/DesignDialog";

class Search extends React.Component {
  debugger;
  setDialogState = () => {
    debugger;
    this.setState({ openDialog: false });
  };
  state = {
    activeSuggestionIndex: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
    openDialog: false
  };

  updateSearch = event => {
    debugger;
    this.setState({
      userInput: null
    });
    this.props.resetCallback();
    // if (this.props.searchType == "team") {
    this.props.searchMatch(event.target.value);
    // }
  };
  handleSearch = debounce(text => {
    debugger;
    this.props.resetCallback();
    this.props.getPlayerByName(text);
  }, 500);

  componentDidUpdate(previousProps) {
    const { playerName, playerInfo } = this.props.NewMatches;
    if (playerInfo != previousProps.NewMatches.playerInfo) {
      this.setState({
        openDialog: true
      });
    }
    if (playerName) {
      var filteredSuggestions = playerName.map(player => {
        return { pid: player.pid, playerName: player.name };
      });
    }
    if (playerName != previousProps.NewMatches.playerName) {
      this.setState({
        activeSuggestionIndex: 0,
        filteredSuggestions,
        showSuggestions: true
      });
    }
  }
  onClick = (e, pid) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });

    this.props.fetchPlayerInfo(pid);
  };

  onKeyDown = e => {
    const { activeSuggestionIndex, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestionIndex: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestionIndex]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }

      this.setState({ activeSuggestionIndex: activeSuggestionIndex - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestionIndex: activeSuggestionIndex + 1 });
    }
  };
  calculateInputValue = (userInput, emptyVal) => {
    if (emptyVal == "") {
      return "";
    } else if (userInput && emptyVal == null) {
      return userInput;
    } else {
      return null;
    }
  };
  render() {
    console.log(this.props, "props");
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestionIndex,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestionIndex) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion.pid}
                  onClick={e => onClick(e, suggestion.pid)}
                >
                  {suggestion.playerName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    // const isTeamSearch = this.props.searchType == "team";

    const { SearchInputProps, enableAutoSuggest, resetValue } = this.props;
    const { playerInfo } = this.props.NewMatches;

    return (
      <React.Fragment>
        <TextField
          inputProps={{
            maxLength: 30
          }}
          value={this.calculateInputValue(userInput, resetValue)}
          placeholder={SearchInputProps.placeholder}
          onChange={
            enableAutoSuggest
              ? e => {
                  this.setState({
                    userInput: e.target.value
                  });
                  this.handleSearch(e.target.value);
                }
              : this.updateSearch
          }
          id={SearchInputProps.id}
          label={SearchInputProps.label}
          margin="normal"
          variant="outlined"
          autoComplete="off"
        />
        {enableAutoSuggest ? suggestionsListComponent : null}
        <DesignDialog
          openDialog={this.state.openDialog}
          playerInfo={playerInfo}
          updateParentDialogState={this.setDialogState}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {
  searchMatch,
  getPlayerByName,
  fetchPlayerInfo
})(Search);
