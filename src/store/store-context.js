import { useReducer } from "react";
import { createContext } from "react";

export const StoreContext = createContext();
export const ACTION_TYPES = {
  SET_LANG_LONG: "SET_LANG_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};
const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LANG_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      throw new Error(`bad action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
