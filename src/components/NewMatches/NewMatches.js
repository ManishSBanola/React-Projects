import React from "react";
import { connect } from "react-redux";
import { fetchNewMatches } from "../../Actions/index";
import { fetchScore } from "../../Actions/index";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Loader from "../loader";
import "./NewMatches.scss";

var clear; /*to clear timeInterval for fetchscore api*/
class NewMatches extends React.Component {
  searchTeamFilter = ({ games }) => {
    return games.filter(game => {
      const matchHeading = `${game["team-1"]} vs ${game["team-2"]}`;
      return (
        matchHeading
          .toLowerCase()
          .indexOf(this.props.searchKey.toLowerCase()) !== -1
      );
    });
  };
  getMatchStartTime = unFormatedTime => {
    const dateObj = new Date(unFormatedTime);
    const localTime = dateObj.toLocaleTimeString();
    const getHours = localTime.substr(0, 4);
    const getExtension = localTime.substr(localTime.length - 2);
    return `Match begins at ${getHours} ${getExtension}`;
  };

  getLiveScore = matchId => {
    this.props.fetchScore(matchId);
    clearInterval(clear);
    clear = setInterval(() => {
      this.props.fetchScore(matchId);
    }, 30000);
  };
  componentWillUnmount() {
    clearInterval(clear);
  }
  isLiveScoreBtnClicked = CardMatchId => {
    if (this.props.matchScore.matchId == CardMatchId) {
      return this.props.matchScore.score;
    }
    return "";
  };

  getTossWinner = tossWinner => {
    if (tossWinner) {
      return `${tossWinner} won the toss`;
    }
    return "";
  };

  groupMatchesByDate = ({ newMatches }) => {
    const { matches } = newMatches;
    const groups = matches.reduce((groups, game) => {
      const date = game.date.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(game);
      return groups;
    }, {});

    // array format
    return Object.keys(groups).map(date => {
      return {
        date,
        games: groups[date]
      };
    });
  };
  getDateInWords = date => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const temp_date = date.split("-");
    const day = new Date(date).getDay();
    return ` ${days[Number(day)]}, ${temp_date[2]} ${
      months[Number(temp_date[1]) - 1]
    } ${temp_date[0]}`;
  };

  render() {
    const { newMatches } = this.props;
    const { matches } = newMatches;

    if (matches) {
      return this.groupMatchesByDate(this.props).map(match => {
        return (
          <div
            className={
              !this.searchTeamFilter(match).length > 0
                ? "hidden"
                : "parent-score-card"
            }
            key={match.date}
          >
            <Typography variant="h6" component="h3" align="center">
              {this.getDateInWords(match.date)}
            </Typography>
            {this.searchTeamFilter(match).map(match => {
              return (
                <Card key={match["unique_id"]}>
                  <CardContent>
                    <Typography
                      align="center"
                      color="textSecondary"
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {match["team-1"] + " vs " + match["team-2"]}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      align="center"
                      gutterBottom
                      variant="h6"
                      component="p"
                    >
                      {this.isLiveScoreBtnClicked(match["unique_id"])}
                    </Typography>
                    <Typography
                      align="center"
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {this.getTossWinner(match["toss_winner_team"])}
                    </Typography>
                    <Typography
                      align="center"
                      className={
                        match["matchStarted"] ? "hidden" : "label-match-begins"
                      }
                    >
                      {this.getMatchStartTime(match["dateTimeGMT"])}
                    </Typography>
                  </CardContent>
                  <CardActions
                    className={!match["matchStarted"] ? "hidden" : ""}
                  >
                    <Button
                      onClick={() => {
                        this.getLiveScore(match["unique_id"]);
                      }}
                      size="small"
                      color="primary"
                    >
                      Live Score
                    </Button>
                    <Button size="small" color="primary">
                      Match Details
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </div>
        );
      });
    } else {
      return <Loader />;
    }
  }
  componentDidMount() {
    this.props.fetchNewMatches();
  }
}

const mapStateToProps = state => {
  return { newMatches: state.NewMatches, matchScore: state.score };
};

export default connect(
  mapStateToProps,
  { fetchNewMatches, fetchScore }
)(NewMatches);
