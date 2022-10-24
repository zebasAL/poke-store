import { Cart, UserFounds, FormatedCurrency, CUnion } from "./";

export type RootReducer = {
  state: ReduxState;
  action: Dispatch;
}

export type ReduxState = {
  isShiny: boolean;
  cart: Cart | null;
  userFounds: UserFounds | null;
  currency: FormatedCurrency;
};

export type ReduxActions = {
  setIsShiny: (params: boolean) => (fun: Dispatch) => void;
  setCart: (params: Cart) => (fun: Dispatch) => void;
  setUserFounds: (params: UserFounds) => (fun: Dispatch) => void;
  setCurrency: (params: FormatedCurrency) => (fun: Dispatch) => void;
};

export type MapState<States> = (state: ReduxState) => States;

/**
 * Se creo un `type` modular para cualquier tipo de `ReduxActions` para la funcion mapDispatchToProps de Redux.
 */
export type MapDispatch<T> = (fun: (param: Dispatch) => any) => T;
export type Dispatch = {
  type: string;
  payload: ReduxState[keyof EnumReduxState] | '';
};

type EnumReduxState = CUnion<ReduxState>;
type EnumReduxActions = CUnion<ReduxActions>;
