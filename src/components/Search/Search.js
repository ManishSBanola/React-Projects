import NewMatches from "../NewMatches/NewMatches";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { searchMatch } from "../../Actions/index";
import "./Search.scss";
class Search extends React.Component {
  updateSearch = event => {
    this.props.searchMatch(event.target.value);
  };
  componentDidMount() {
    debugger;
    this.props.searchMatch();
  }
  render() {
    return (
      <React.Fragment>
        <TextField
          placeholder="Search for team"
          onChange={this.updateSearch}
          id="team-search"
          label="Team Search "
          margin="normal"
          variant="outlined"
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  debugger;
  return state;
};

export default connect(
  mapStateToProps,
  { searchMatch }
)(Search);
