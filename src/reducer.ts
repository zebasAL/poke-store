import { RootReducer } from "./models";

const initialState: RootReducer["state"] = {
  isShiny: false,
  cart: null,
  userFounds: null,
};

const rootReducer = (state = initialState, action: RootReducer["action"] = { type: '', payload: '' }) => {
  switch (action.type) {
    case 'SET_IS_SHINY':
      return { ...state, isShiny: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'SET_USER_FOUNDS':
      return { ...state, userFounds: action.payload };
    default:
      return state;
  };
};

export default rootReducer;
