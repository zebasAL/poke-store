import { z } from "zod";

// from https://stackoverflow.com/a/71476167/10873797
export type CUnion<T extends Record<PropertyKey, unknown>>
  = { [K in keyof T]: { [_ in K]: T[K] } & { [_ in Exclude<keyof T, K>]?: undefined } }[keyof T];

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
Pick<T, Exclude<keyof T, Keys>> 
& {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]
