export type RootReducer = {
  state: ReduxState,
  action: Dispatch,
}

export type ReduxState = {
  isShiny: boolean,
  pokemonsDisplayed: Array<any>;
  defaultdisplayedPokemons: Array<any>;
};

export type ReduxActions = {
  setIsShiny: (params: boolean) => void,
  setPokemonsDisplayed: (params: Array<any>) => void;
  setDefaultdisplayedPokemons: (params: Array<any>) => void;
};

export type MapState = (state: ReduxState) => Partial<ReduxState>;

/**
 * Se creo un `type` modular para cualquier tipo de `ReduxActions` para la funcion mapDispatchToProps de Redux.
 */
export type MapDispatch = (fun: (param: Dispatch) => any) => Partial<ReduxActions>;
export type Dispatch = {
  type: string;
  payload: ReduxState[keyof EnumReduxState] | '';
};

// from https://stackoverflow.com/a/71476167/10873797
type CUnion<T extends Record<PropertyKey, unknown>>
  = { [K in keyof T]: { [_ in K]: T[K] } & { [_ in Exclude<keyof T, K>]?: undefined } }[keyof T];
type EnumReduxState = CUnion<ReduxState>;
