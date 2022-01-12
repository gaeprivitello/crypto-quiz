import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { makeStyles } from "@mui/styles";
import { AccountContext } from "../../context/AccountContext";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  toolbarContainer: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    justifyContent: "space-between",
  },
  accountInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export const Header = () => {
  const classes = useStyles();

  const { currentAccount, balance, connectWallet, disconnectWallet } =
    React.useContext(AccountContext);

  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbarContainer}>
          <Typography variant="h6">CryptoQuiz</Typography>
          {currentAccount ? (
            <Box className={classes.accountInfoContainer}>
              {`QUIZ: ${balance} - ${currentAccount.substring(0, 17)}...`}
              <Button onClick={disconnectWallet} color="secondary">
                <LogoutIcon />
              </Button>
            </Box>
          ) : (
            <Button
              onClick={connectWallet}
              variant="contained"
              color="secondary"
            >
              Connect Wallet
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
