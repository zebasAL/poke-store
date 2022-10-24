import { AxiosError } from "axios";
import { FormatedCurrency, CurrencyResponse } from "./models";
import { availableCurrencies } from "./utilities";

type PromiseAllSettledResponse = {
  status: "fulfilled" | "rejected";
  value?: any, reason?: AxiosError;
}

type Currency = Array<FormatedCurrency>;

export const getFulfilledData = (data: Array<PromiseAllSettledResponse>): any => {
  return (data.filter((res) => res.status === "fulfilled").map((res) => res.value));
}

export const getFormateCurrencies = (data: CurrencyResponse): Currency => {
  if (!data.success && data.quotes) return [];
  let currencies: Currency = [{
    ...availableCurrencies[0],
    quote: 1,
  }];

  for (const quote in data?.quotes) {
    // @ts-ignore
    const quoteValue: any = data.quotes[quote] ?? 0;
    const quoteName = quote.replace(data.source, "");
    const newCurrency = availableCurrencies.find((currency) => currency.currencyCode === quoteName)

    if (newCurrency !== undefined) {
      currencies.push({
        ...newCurrency,
        quote: quoteValue,
      });
    };
  };
  return currencies;
};