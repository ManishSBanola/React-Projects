import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TableDesign from "../Table/TableDesign";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  image: {
    width: "auto",
    height: "140px",
    margin: "0 auto"
  },
  labelMargin: {
    margin: "10px 0 10px 0"
  }
}));

const PlayerInfo = props => {
  const classes = useStyles();

  const { PlayerInfo } = props;
  return (
    <Card>
      <CardMedia
        className={classes.image}
        component="img"
        alt="Player photo cant load"
        height="140"
        width="auto"
        image={PlayerInfo.imageURL}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography align="center" gutterBottom variant="h5" component="h2">
          {PlayerInfo.fullName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {PlayerInfo.profile}
        </Typography>
        <Typography
          className={classes.labelMargin}
          align="left"
          gutterBottom
          variant="h6"
          component="h2"
        >
          Batting Performance
        </Typography>
        <TableDesign size="small" data={PlayerInfo.data.batting} />
        <Typography
          className={classes.labelMargin}
          align="left"
          gutterBottom
          variant="h6"
          component="h2"
        >
          Bowling Performance
        </Typography>
        <TableDesign size="small" data={PlayerInfo.data.bowling} />
      </CardContent>
    </Card>
  );
};

export default PlayerInfo;
