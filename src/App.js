import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { AccountContext } from "./context/AccountContext";
import { DailyTrivia } from "./components/trivia/DailyTrivia";
import { Welcome } from "./components/home/Welcome";
import { Loader } from "./components/layouts/Loader";
import { ErrorMessage } from "./components/layouts/ErrorMessage";

function App() {
  const {
    currentAccount,
    checkWalletIsConnected,
    transactionInProgress,
    getBalance,
    ropsten,
    error,
  } = useContext(AccountContext);

  useEffect(() => {
    checkWalletIsConnected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentAccount && ropsten) {
      getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount, ropsten]);

  return (
    <Box>
      {!error ? (
        !currentAccount ? (
          <Welcome />
        ) : !transactionInProgress ? (
          <DailyTrivia />
        ) : (
          <Loader text={"Transaction in progress..."} />
        )
      ) : (
        <ErrorMessage />
      )}
    </Box>
  );
}

export default App;
