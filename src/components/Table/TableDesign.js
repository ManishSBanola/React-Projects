import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import "./TableDesign.scss";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(1),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));

const getKeys = props => {
  let checkData = Object.entries(props.data).length > 0;
  if (checkData) {
    return Object.keys(props.data[Object.keys(props.data)[0]]);
  }
  return null;
};
const getHeader = props => {
  var keys = getKeys(props);
  if (!keys) {
    return;
  }

  keys.unshift("League");
  return keys.map((key, index) => {
    return (
      <TableCell component="th" key={key}>
        {key.toUpperCase()}
      </TableCell>
    );
  });
};

const getRowsData = data => {
  return data.map(e => (
    <TableRow>
      <TableCell component="th">{e[0].toUpperCase()}</TableCell>
      {Object.values(e[1]).map(e => {
        return <TableCell component="td">{e}</TableCell>;
      })}
    </TableRow>
  ));
};
const TableDesign = props => {
  const classes = useStyles();

  console.log(props, "table design");
  const { size } = props;

  return (
    <Paper className={classes.paper}>
      <Table size={size} {...props} aria-label="simple table">
        <TableBody>
          {/* <TableHead> */}
          <TableRow>{getHeader(props)}</TableRow>
          {/* </TableHead> */}
          {getRowsData(Object.entries(props.data))}
          {/* <TableRow>{getRowsData(props.data)}</TableRow> */}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TableDesign;
