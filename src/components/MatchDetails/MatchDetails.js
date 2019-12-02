import React from "react";
import { connect } from "react-redux";
import { fetchMatchDetails } from "../../Actions/index";
import DesignCard from "../DesignCard/DesignCard";
import Typography from "@material-ui/core/Typography";
import Loader from "../loader";
import "./MatchDetails.scss";
import { alterSearchType } from "../../Actions/index";
class MatchDetails extends React.Component {
  render() {
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
                  <DesignCard players={team.players} />
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
    this.props.fetchMatchDetails(this.props.match.params.id);
    this.props.alterSearchType(window.location.pathname == "/");
  }
}

const mapStateToProps = state => {
  return { MatchDetails: state.MatchDetails };
};

export default connect(mapStateToProps, { fetchMatchDetails, alterSearchType })(
  MatchDetails
);
