import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const TriviaPreview = ({ trivia, startTrivia }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="h4">
        {trivia.title}
      </Typography>
      <img src={trivia.image} height={200} alt={trivia.title} loading="lazy" />
      <Button onClick={startTrivia} variant="contained" color="secondary">
        Start Trivia
      </Button>
    </Box>
  );
};
