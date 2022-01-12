import React, { createContext, useReducer } from "react";
import { ethers } from "ethers";
import contract from "../contracts/QUIZ.json";
import { accountReducer } from "./AccountReducer";
import {
  SET_ACCOUNT,
  SET_BALANCE,
  SET_ERROR,
  SET_ROPSTEN,
  SET_TRANSACTION_IN_PROGRESS,
} from "./types";

const initialState = {
  currentAccount: null,
  ropsten: false,
  balance: null,
  transactionInProgress: false,
  error: null,
};

export const AccountContext = createContext({ ...initialState });

const AccountProvider = ({ children }) => {
  const contractAddress = contract.address;
  const abi = contract.abi;

  const [state, dispatch] = useReducer(accountReducer, initialState);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    let { name } = await provider.getNetwork();

    if (name === "ropsten") {
      dispatch({
        type: SET_ROPSTEN,
        payload: true,
      });
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        dispatch({
          type: SET_ACCOUNT,
          payload: account,
        });
      } else {
        console.log("No authorized account found");
      }
    } else {
      dispatch({
        type: SET_ROPSTEN,
        payload: false,
      });
    }
  };

  const switchNetwork = async () => {
    const { ethereum } = window;

    if (ethereum) {
      ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x3" }],
        })
        .then(() => {
          dispatch({
            type: SET_ROPSTEN,
            payload: true,
          });
        });
    }
  };

  const disconnectWallet = () => {
    dispatch({
      type: SET_ACCOUNT,
      payload: null,
    });
  };

  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
      return;
    }

    if (!state.ropsten) {
      await switchNetwork();
    } else {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Found an account! Address: ", accounts[0]);

        dispatch({
          type: SET_ACCOUNT,
          payload: accounts[0],
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getBalance = async () => {
    const { ethereum } = window;

    if (ethereum && state.ropsten) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const quizContract = new ethers.Contract(contractAddress, abi, signer);

      let balance = await quizContract.balanceOf(state.currentAccount);

      dispatch({
        type: SET_BALANCE,
        payload: ethers.utils.formatEther(balance),
      });
    }
  };

  const submitTrivia = async (surveyId, results) => {
    const triviaAnswers = results.map(({ answer }) => answer.id);

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const surveyContract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );

        const submit = await surveyContract.submit(surveyId, triviaAnswers, {
          gasLimit: 210000,
        });

        dispatch({
          type: SET_TRANSACTION_IN_PROGRESS,
          payload: true,
        });

        await submit.wait();
        getBalance();
      } else {
        alert("Please connect your Wallet!");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_ERROR,
        payload: true,
      });
    }
    dispatch({
      type: SET_TRANSACTION_IN_PROGRESS,
      payload: false,
    });
  };

  return (
    <AccountContext.Provider
      value={{
        ...state,
        checkWalletIsConnected,
        connectWallet,
        switchNetwork,
        disconnectWallet,
        getBalance,
        submitTrivia,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
