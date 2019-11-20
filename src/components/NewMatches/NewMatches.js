import React, { lazy, Suspense } from "react";
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
import { searchMatch } from "../../Actions/index";
import TypographyHeading from "../TypographyHeading";
import Pagination from "../Pagination/Pagination";
import PaginationAdvance from "../PaginationAdvance/PaginationAdvance";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import history from "../history";
import NoDataFound from "../NoDataFound";
//const TypographyHeading = lazy(() => import("../TypographyHeading"));
var clear; /*to clear timeInterval for fetchscore api*/
class NewMatches extends React.Component {
  noResultsFound = false;
  state = {
    currentPage: 1,
    matchesPerPage: 2,
    liveScoreBtnClicked: {}
  };

  getFilteredMatches = matches => {
    const flag = matches
      .slice(this.firstIndex, this.lastIndex)
      .map(match => {
        if (!this.searchTeamFilter(match).length) return null;

        this.searchTeamFilter(match).map(match => match);
      })
      .every(item => item !== undefined && !item);

    return flag;
  };
  goToMatchDetails = (e, matchId) => {
    console.log(matchId);
    history.push(`/MatchDetails/${matchId}`);
  };

  onPageChanged = data => {
    debugger;
    const { currentPage, totalPages, pageLimit } = data;

    this.firstIndex = (currentPage - 1) * pageLimit;
    this.lastIndex = this.firstIndex + pageLimit;
    this.setState({ currentPage, totalPages });
  };

  recordsPerPage = value => {
    this.setState({ matchesPerPage: value });
  };
  navigateToClickedPage = paginationNumber => {
    this.setState({ currentPage: paginationNumber });
  };
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
    debugger;
    this.setState({ liveScoreBtnClicked: { value: true, matchId: matchId } });
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
    if (
      this.props.matchScore.matchId == CardMatchId &&
      this.props.matchScore.score
    ) {
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
  componentDidUpdate(prevProps) {
    if (prevProps.newMatches.score != this.props.newMatches.score)
      this.setState({ liveScoreBtnClicked: { value: false } });
  }
  render() {
    const { newMatches } = this.props;
    const { matches } = newMatches;

    if (matches) {
      const lastMatchIndex = this.state.currentPage * this.state.matchesPerPage;
      const firstMatchIndex = lastMatchIndex - this.state.matchesPerPage;
      const totalMatches = this.groupMatchesByDate(this.props);
      console.log(totalMatches);
      const filteredTotalMatches = totalMatches.filter(
        ({ games }) => games && games.length
      );
      console.log(filteredTotalMatches);

      if (this.getFilteredMatches(filteredTotalMatches)) {
        this.content = <NoDataFound message="No Results Found" />;
        this.noResultsFound = true;
      } else {
        this.noResultsFound = false;
        this.content = filteredTotalMatches
          .slice(this.firstIndex, this.lastIndex)
          .map(match => {
            if (!this.searchTeamFilter(match).length) return null;
            return (
              <div className="parent-score-card" key={match.date}>
                <Typography variant="h6" component="h3" align="center">
                  {this.getDateInWords(match.date)}
                </Typography>
                {this.searchTeamFilter(match).map(match => {
                  return (
                    <Card key={match["unique_id"]}>
                      <CardContent>
                        <TypographyHeading
                          align="center"
                          color="textSecondary"
                          gutterBottom
                          variant="h5"
                          component="h2"
                          value={match["team-1"] + " vs " + match["team-2"]}
                        />
                        {
                          <TypographyHeading
                            align="center"
                            color="textSecondary"
                            className={
                              this.props.matchScore.score ? null : "hidden"
                            }
                            gutterBottom
                            variant="h6"
                            component="p"
                            value={this.isLiveScoreBtnClicked(
                              match["unique_id"]
                            )}
                          />
                        }{" "}
                        {
                          <LinearProgress
                            color="primary"
                            className={
                              this.state.liveScoreBtnClicked.value &&
                              this.state.liveScoreBtnClicked.matchId ==
                                match["unique_id"]
                                ? null
                                : "hidden"
                            }
                          />
                        }
                        <TypographyHeading
                          align="center"
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          value={this.getTossWinner(match["toss_winner_team"])}
                        />
                        <TypographyHeading
                          align="center"
                          className={
                            match["matchStarted"]
                              ? "hidden"
                              : "label-match-begins"
                          }
                          value={this.getMatchStartTime(match["dateTimeGMT"])}
                        />
                      </CardContent>

                      <CardActions
                        className={
                          !match["matchStarted"] || !match["toss_winner_team"]
                            ? "hidden"
                            : ""
                        }
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
                        <Button
                          onClick={e =>
                            this.goToMatchDetails(e, match["unique_id"])
                          }
                          size="small"
                          color="primary"
                        >
                          Match Details
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })}
              </div>
            );
          });
      }
      return (
        <div className="match-grid-container">
          {this.content}
          {!this.noResultsFound ? (
            <PaginationAdvance
              totalRecords={totalMatches.length}
              pageLimit={this.state.matchesPerPage}
              pageNeighbours={1}
              onPageChanged={this.onPageChanged}
            />
          ) : null}
        </div>
      );
    } else {
      return <Loader />;
    }
  }
  componentDidMount(previousProps) {
    this.props.fetchNewMatches();
  }
}

const mapStateToProps = state => {
  return {
    newMatches: state.NewMatches,
    matchScore: state.score,
    searchKey: state.searchKey
  };
};

export default connect(mapStateToProps, {
  fetchNewMatches,
  fetchScore,
  searchMatch
})(NewMatches);
