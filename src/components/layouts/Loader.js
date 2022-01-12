import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection:'column',
    alignItems: "center",
    alignContent: "center",
    marginTop: 80,
  },
});

export const Loader = ({ text = 'Loading...' }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress />
      <Typography marginTop={2} align="center" variant="h7">
        {text}
      </Typography>
    </Box>
  );
};
