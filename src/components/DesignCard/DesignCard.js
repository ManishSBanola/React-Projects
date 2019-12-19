import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { fetchPlayerInfo, setModalOpen } from "../../Actions/index";
import "./DesignCard.scss";
import { connect } from "react-redux";
import DesignDialog from "../Dialog/DesignDialog";
class DesignCard extends React.Component {
  state = {
    openDialogDesign: false
  };
  showDialogPlayerStats = (e, pid) => {
    debugger;
    this.props.fetchPlayerInfo(pid);
  };

  setDialogState = () => {
    debugger;
    this.setState({ openDialogDesign: false });
  };
  // componentDidMount(){
  //     debugger;
  //     var el=document.getElementsByClassName('grid-player');
  // if(el){
  // el[0].innerHTML = el[0].innerHTML.replace(/&nbsp;/g,'');
  // el[1].innerHTML = el[1].innerHTML.replace(/&nbsp;/g,'');
  // }
  // }
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
  }
  render() {
    console.log("%cdesign card rendered", "color:violet");
    console.log(this.state.openDialogDesign, "dialog state");
    const { players } = this.props;

    const { playerInfo } = this.props.NewMatches;

    return (
      <>
               
        {players.map(player => {
          return (
            <Card key={player.pid} className="card-players">
                           
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
             
      </>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { fetchPlayerInfo, setModalOpen })(
  DesignCard
);
