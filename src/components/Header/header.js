import React from "react";
import { AppBar } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ToolBar from "@material-ui/core/Toolbar";
import "./header.scss";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import SvgCricketBall from "../../assets/cricketball.svg";
import SearchIcon from "@material-ui/icons/Search";
import TimelineIcon from "@material-ui/icons/Timeline";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const header = () => {
  return (
    <AppBar className="app-header">
      <ToolBar className="grid-header">
        <img alt="cricket ball icon" src={SvgCricketBall}></img>
        <Typography variant="h5">Cricket Plus</Typography>
        <List className="list-header">
          <ListItem>
            <Link color="inherit">
              <Typography className="h7 icon-align">
                <TimelineIcon />
                Old Matches
              </Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link color="inherit">
              <Typography className="icon-align">
                <SearchIcon />
                Player Finder
              </Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link color="inherit">
              <Typography className="icon-align">
                <CalendarTodayIcon />
                Match Calendar
              </Typography>
            </Link>
          </ListItem>
        </List>
      </ToolBar>
    </AppBar>
  );
};

export default header;
