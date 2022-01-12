import {
  SET_ACCOUNT,
  SET_BALANCE,
  SET_ERROR,
  SET_ROPSTEN,
  SET_TRANSACTION_IN_PROGRESS,
} from "./types";

export const accountReducer = (state, action) => {
  switch (action.type) {
    case SET_ACCOUNT: {
      return { ...state, currentAccount: action.payload };
    }
    case SET_BALANCE: {
      return { ...state, balance: action.payload };
    }
    case SET_TRANSACTION_IN_PROGRESS: {
      return { ...state, transactionInProgress: action.payload };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case SET_ROPSTEN: {
      return { ...state, ropsten: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
