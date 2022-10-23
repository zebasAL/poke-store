import { Cart, UserFounds } from "./";

// from https://stackoverflow.com/a/71476167/10873797
type CUnion<T extends Record<PropertyKey, unknown>>
  = { [K in keyof T]: { [_ in K]: T[K] } & { [_ in Exclude<keyof T, K>]?: undefined } }[keyof T];

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
Pick<T, Exclude<keyof T, Keys>> 
& {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]

export type RootReducer = {
  state: ReduxState;
  action: Dispatch;
}

export type ReduxState = {
  isShiny: boolean;
  cart: Cart | null;
  userFounds: UserFounds | null;
};

export type ReduxActions = {
  setIsShiny: (params: boolean) => void;
  setCart: (params: Cart) => (fun: Dispatch) => void;
  setUserFounds: (params: UserFounds) => void;
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
