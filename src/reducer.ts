import { RootReducer } from "./models";
import usa from "./assets/currency-icons/usa.svg";
import { newFunds } from "./helpers";

// for every update in this root, change first the next `types`: ReduxState & ReduxActions;
const initialState: RootReducer["state"] = {
  isShiny: false,
  cart: null,
  userFunds: {
    userId: 1,
    currency: "USD",
    funds: newFunds,
    updatedAt: new Date().toISOString(),
  },
  currency: {
    currencyName: "American Dollar",
    currencyCode: "USD",
    country: "USA",
    symbol: "$",
    image: usa,
    quote: 1,
  },
};

const rootReducer = (state = initialState, action: RootReducer["action"] = { type: "", payload: "" }) => {
  switch (action.type) {
    case "SET_IS_SHINY":
      return { ...state, isShiny: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "SET_USER_FUNDS":
      return { ...state, userFunds: action.payload };
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
    default:
      return state;
  };
};

export default rootReducer;
