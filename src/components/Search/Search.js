import NewMatches from "../NewMatches/NewMatches";
import React from "react";
import TextField from '@material-ui/core/TextField'

class Search extends React.Component {
state={searchText:''};

updateSearch=(event)=>{
this.setState({searchText:event.target.value})
}
  render() {
  
    return (
      <React.Fragment>
       <TextField value={this.state.searchText} onChange={this.updateSearch} id="team-search" label="Team Search " margin="normal" variant="outlined"/>
        <NewMatches searchKey={this.state.searchText} sendMatchInfo={this.matchInfo} />
      </React.Fragment>
    );
  }
}

export default Search;
