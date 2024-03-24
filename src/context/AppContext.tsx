import React, { createContext, useReducer } from "react";
import { Product } from "../api/types";

interface State {
  products: Product[];
  currentPage: number;
  filterId: number | undefined;
  selectedProduct: Product | null;
  error: Error | null;
  modalOpen: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

interface AppContextProviderProps {
  children: React.ReactNode;
}

const initialState: State = {
  products: [],
  currentPage: 1,
  filterId: undefined,
  selectedProduct: null,
  error: null,
  modalOpen: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_FILTER_ID":
      return { ...state, filterId: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
