import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

export const ErrorMessage = ({ text = 'Something went wrong, please try again later' }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography align="center" variant="h6">
        {text}
      </Typography>
    </Box>
  );
};
