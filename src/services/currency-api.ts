import { currencyApi, CurrenciesOptions } from "../api";
import { getFormateCurrencies } from "../adapters";

export const CurrencyService = {
  getCurrencies: async (currencies: Array<CurrenciesOptions>) => {
    const response = await currencyApi.getCurrencies(currencies);
    return (getFormateCurrencies(response));
  },
};