import NewMatches from "../NewMatches/NewMatches";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import {
  searchMatch,
  getPlayerByName,
  fetchPlayerInfo,
  setModalOpen
} from "../../Actions/index";
import "./Search.scss";
import { Link } from "react-router-dom";
import history from "../history";
import DesignDialog from "../Dialog/DesignDialog";
class Search extends React.Component {
  setDialogState = () => {
    this.setState({ openDialog: false });
  };
  state = {
    activeSuggestionIndex: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
    openDialog: false,
    searchListClicked: false
  };
  updateSearch = event => {
    this.setState({
      userInput: null
    });
    this.props.resetCallback();
    // if (this.props.searchType == "team") {
    this.props.searchMatch(event.target.value);
    // }
  };
  handleSearch = debounce(text => {
    this.props.resetCallback();
    this.props.getPlayerByName(text);
  }, 500);
handleResize=()=>{
  if(this.props.enableAutoSuggest && document.getElementById('player-search') && document.getElementById('suggestions')){

    let inputWidth=document.getElementById('player-search').offsetWidth;
    document.getElementsByClassName('suggestions')[0].style=`width:${inputWidth}px`
   
   }
}
 componentDidMount(){
   let resizeTimer;
   clearTimeout(resizeTimer);
   resizeTimer=setTimeout(()=>{
    window.addEventListener('resize',this.handleResize)
   },500);
   
 }
 componentWillUnmount(){
   window.removeEventListener('resize',this.handleResize)
 }
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(
        ([key, val]) =>
          prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }
    debugger;
if(this.props.enableAutoSuggest && document.getElementById('player-search') && document.getElementById('suggestions')){

 let inputWidth=document.getElementById('player-search').offsetWidth;
 document.getElementsByClassName('suggestions')[0].style=`width:${inputWidth}px`

}
 
    const { playerName, playerInfo } = this.props.NewMatches;
    console.log(this.props, "props");

    if (
      playerInfo &&
      playerInfo.pid !=
        (prevProps.NewMatches.playerInfo
          ? prevProps.NewMatches.playerInfo.pid
          : undefined)
    ) {
      this.props.setModalOpen(playerInfo);
    }
    if (playerName) {
      var filteredSuggestions = playerName.map(player => {
        return { pid: player.pid, playerName: player.name };
      });
    }
    if (playerName != prevProps.NewMatches.playerName) {
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
      userInput: e.currentTarget.innerText,
      searchListClicked: true
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
          <ul className="suggestions" id="suggestions">
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
  fetchPlayerInfo,
  setModalOpen
})(Search);
