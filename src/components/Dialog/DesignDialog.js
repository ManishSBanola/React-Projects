import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import { connect } from "react-redux";

const DesignDialog = props => {
  // useEffect(() => {
  //   debugger;
  //   setOpen(props.openDialog);
  // }, [props.openDialog]);

  useEffect(() => {
    debugger;
    let hasData = Object.entries(props.ModalOpen).length > 0;
    setOpen(hasData);
  }, [props.ModalOpen]);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  // const handleClickOpen = scrollType => () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    debugger;
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="scroll-dialog-title">Player Stats</DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          {<PlayerInfo PlayerInfo={props.ModalOpen} />}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = state => {
  debugger;
  console.log(state);
  return state;
};

export default connect(mapStateToProps)(DesignDialog);
