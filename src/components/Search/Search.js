import NewMatches from "../NewMatches/NewMatches";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { searchMatch, getPlayerByName } from "../../Actions/index";
import "./Search.scss";
class Search extends React.Component {
  state = {
    activeSuggestionIndex: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ""
  };

  updateSearch = event => {
    this.setState({
      userInput: null
    });
    this.props.resetCallback();
    if (this.props.searchType == "team") {
      this.props.searchMatch(event.target.value);
    }
  };
  playerSearch = e => {
    this.props.resetCallback();
    this.props.getPlayerByName(e.target.value);
    this.setState({
      userInput: e.currentTarget.value
    });
  };
  componentDidUpdate(previousProps) {
    const { playerName } = this.props.NewMatches;

    if (playerName) {
      var filteredSuggestions = playerName.map(player => {
        return player.fullName;
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
  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
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
  resetInputValue = (userInput, emptyVal) => {
    if (emptyVal == "") {
      return "";
    } else if (userInput && emptyVal == null) {
      return userInput;
    } else {
      return null;
    }
  };
  render() {
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
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestionIndex) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
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

    const isTeamSearch = this.props.searchType == "team";

    const { SearchInputProps, enableAutoSuggest, resetValue } = this.props;

    return (
      <React.Fragment>
        <TextField
          value={this.resetInputValue(userInput, resetValue)}
          placeholder={SearchInputProps.placeholder}
          onChange={enableAutoSuggest ? this.playerSearch : this.updateSearch}
          id={SearchInputProps.id}
          label={SearchInputProps.label}
          margin="normal"
          variant="outlined"
        />
        {enableAutoSuggest ? suggestionsListComponent : null}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { searchMatch, getPlayerByName }
)(Search);
