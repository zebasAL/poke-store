import type { AxiosError, AxiosRequestConfig } from "axios";
import axios, { AxiosInstance } from "axios";
import z from "zod";
import { currenciesValue, CurrenciesOptions, CurrencyResponse, currencyResponseSchema } from "./";
const env_var = import.meta.env;

class CurrencyApi {
  private static instance: CurrencyApi;
  private req: AxiosInstance;
  private readonly baseConfig: AxiosRequestConfig = {
    baseURL: env_var.VITE_CURRENCY_API_URL,
    headers: {
      Accept: "application/json",
      "apikey": env_var.VITE_CURRENCY_API_KEY,
      "Content-Type": "application/json",
    },
  }
  private readonly mainCurrency = sessionStorage.getItem("currency") ?? "USD";

  private constructor() {
    this.req = axios.create(this.baseConfig);
  }

  /**
   * Checks if data is valid against the provided schema.
   * Throws an error when data is invalid and when we are not in production.
   * It is intended to be used in development and testing in order to catch errors.
   * 
   * @param schema 
   * @param data 
   * @private
   */
  private static checkSchema<Schema extends z.Schema, Data = z.infer<Schema>>(
    schema: Schema,
    data: Data,
  ): Data {
    try {
      schema.parse(data);
    } catch (error: unknown) {
      if (!(error instanceof z.ZodError) && env_var.VITE_VERCEL_ENV !== "production") {
        console.warn("An schema must be correted", error);
        throw error;
      }
    }
    return data;
  }

  public static getInstance(): CurrencyApi {
    if (CurrencyApi.instance === undefined) {
        CurrencyApi.instance = new CurrencyApi();
    }
    return CurrencyApi.instance;
  }

  public async getCurrencies(selectedCurrencies: Array<CurrenciesOptions>): Promise<CurrencyResponse> {
    let currencies = "";
    if (selectedCurrencies.includes("all")) {
      currenciesValue.forEach((currency) => currencies = currencies.concat(`${currency},`))
    } else {
      currenciesValue
        .filter((currency) => selectedCurrencies
          .find((selectedCurrency: string) => selectedCurrency === currency))
        .forEach((currency => currencies = currencies.concat(`${currency},`)));
    };

    const url = "/currency_data/live"
    const config: AxiosRequestConfig = {
      params: {
        source: this.mainCurrency,
        currencies,
      },
    };
    const { data } = await this.req.get(url, config);
    return CurrencyApi.checkSchema(currencyResponseSchema, data);
  };
};

export const currencyApi = CurrencyApi.getInstance();