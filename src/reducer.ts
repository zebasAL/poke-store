import { RootReducer } from "./models";

const initialState: RootReducer["state"] = {
  isShiny: false,
  pokemonsDisplayed: [],
  defaultdisplayedPokemons: [],
};

const rootReducer = (state = initialState, action: RootReducer["action"] = { type: '', payload: '' }) => {
  switch (action.type) {
    case 'SET_IS_SHINY':
      return { ...state, isShiny: action.payload };
    case 'SET_POKEMONS_DISPLAYED':
      return { ...state, pokemonsDisplayed: action.payload };
    case 'SET_DEFAULT_DISPLAYED_POKEMONS':
      return { ...state, defaultdisplayedPokemons: action.payload };
    default:
      return state;
  };
};

export default rootReducer;
