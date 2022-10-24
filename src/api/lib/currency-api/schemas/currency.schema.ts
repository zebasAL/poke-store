import { z } from "zod";

export const currenciesValue = [
  "USD",
  "GTQ",
  "PAB",
  "PYG",
  "UYU",
  "VEF",
  "ARS",
  "BRL",
  "COP",
  "PEN",
  "MXN",
  "CLP",
  "CLF",
  "BTC",
];

export const currenciesSchema = z.enum([
  "USD",
  "GTQ",
  "PAB",
  "PYG",
  "UYU",
  "VEF",
  "ARS",
  "BRL",
  "COP",
  "PEN",
  "MXN",
  "CLP",
  "CLF",
  "BTC",
]);
export type CurrenciesOptions = z.infer<typeof currenciesSchema> | "all";


export const currencyResponseSchema = z
  .object({
    success: z.boolean(),
    /**
     * timestamp in ms
     */
    timestamp: z.number().positive(),
    source: z.literal("MXN"),
    quotes: z
      .object({
        ["USDMXN"]: z.number().positive(),
        ["USDGTQ"]: z.number().positive(),
        ["USDPAB"]: z.number().positive(),
        ["USDPYG"]: z.number().positive(),
        ["USDUYU"]: z.number().positive(),
        ["USDARS"]: z.number().positive(),
        ["USDBRL"]: z.number().positive(),
        ["USDCOP"]: z.number().positive(),
        ["USDPEN"]: z.number().positive(),
        ["USDCLP"]: z.number().positive(),
        ["USDCLF"]: z.number().positive(),
        ["USDBTC"]: z.number().positive(),
      })
      .optional(),
  })
  .strict();

export type CurrencyResponse = z.infer<typeof currencyResponseSchema>;