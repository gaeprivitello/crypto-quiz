import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { AccountContext } from "../../context/AccountContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  alert: {
    maxWidth: 600,
    marginRight: "10%",
    marginLeft: "10%",
    marginBottom: 5,
  },
});

export const Welcome = () => {
  const classes = useStyles();

  const { ropsten, switchNetwork } = useContext(AccountContext);

  return (
    <Box className={classes.root}>
      <Typography marginTop={10} align="center" variant="h4">
        {"Welcome to CryptoQuiz Trivia"}
      </Typography>
      {!ropsten && (
        <Box className={classes.root}>
          <Alert className={classes.alert} severity="info">
            {"This app needs to switch to the Ropsten Network to work"}
          </Alert>
          <Button onClick={switchNetwork} variant="contained">
            Switch Network
          </Button>
        </Box>
      )}
    </Box>
  );
};
