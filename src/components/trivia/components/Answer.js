import React from "react";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
});

export const Answer = ({ answer, currentAnswer, setCurrentAnswer }) => {
  const classes = useStyles();

  return (
    <Box>
      <Box onClick={() => setCurrentAnswer(answer)} className={classes.root}>
        <Typography>{answer.text}</Typography>
        <Checkbox checked={currentAnswer ? answer.id === currentAnswer.id : false} />
      </Box>
      <Divider light />
    </Box>
  );
};
