import React from "react";
import { connect } from "react-redux";
import { fetchMatchDetails } from "../../Actions/index";
import DesignCard from "../DesignCard/DesignCard";
import Typography from "@material-ui/core/Typography";
import Loader from "../loader";
import "./MatchDetails.scss";
class MatchDetails extends React.Component {
  render() {
    console.log(this.props.MatchDetails);
    const { MatchDetails } = this.props;
    if (MatchDetails.data) {
      return (
        <div className="grid-players">
          {MatchDetails.data.team.map(team => {
            return (
              <div key={team.name}>
                <Typography gutterBottom variant="h5" component="h2">
                  {team.name}
                </Typography>
                <div className="grid-player">
                  <DesignCard players={team.players}>MatchDetails</DesignCard>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <Loader />;
    }
  }

  componentDidMount() {
    console.log(this.props);
    this.props.fetchMatchDetails(this.props.match.params.id);
  }
}

const mapStateToProps = state => {
  debugger;
  return { MatchDetails: state.MatchDetails };
};

export default connect(mapStateToProps, { fetchMatchDetails })(MatchDetails);
