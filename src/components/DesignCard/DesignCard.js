import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { fetchPlayerInfo } from "../../Actions/index";
import "./DesignCard.scss";
import { connect } from "react-redux";
import DesignDialog from "../Dialog/DesignDialog";
class DesignCard extends React.Component {
  state = {
    openDialog: false
  };
  showDialogPlayerStats = (e, pid) => {
    debugger;
    this.props.fetchPlayerInfo(pid);
  };

  setDialogState = () => {
    debugger;
    this.setState({ openDialog: false });
  };

  render() {
    const { players } = this.props;
    debugger;
    //  if (this.props.NewMatches.hasOwnProperty("playerInfo")) {
    const { playerInfo } = this.props.NewMatches;
    //  }
    return (
      <>
        {players.map(player => {
          return (
            <Card key={player.pid} className="card-players">
              <CardActionArea>
                <CardContent>
                  <Typography
                    align="center"
                    className="font-sm"
                    gutterBottom
                    variant="h6"
                    component="h6"
                  >
                    {player.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  onClick={e => this.showDialogPlayerStats(e, player.pid)}
                  size="small"
                  color="primary"
                >
                  View Stats
                </Button>
              </CardActions>
            </Card>
          );
        })}
        <DesignDialog
          openDialog={this.state.openDialog}
          playerInfo={playerInfo}
          updateParentDialogState={this.setDialogState}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { fetchPlayerInfo })(DesignCard);
