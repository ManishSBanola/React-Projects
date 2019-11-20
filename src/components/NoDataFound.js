import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
const NoResultsFound = styled.div`
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  height: 300px;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const NoDataFound = ({ message }) => {
  return (
    <NoResultsFound>
      <Typography
        align="center"
        color="textSecondary"
        gutterBottom
        variant="h5"
        component="h2"
      >
        {message}
      </Typography>
    </NoResultsFound>
  );
};

export default NoDataFound;
