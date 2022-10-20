import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios, { AxiosInstance } from "axios";
import z from "zod";

class PokeApi {
  private static instance: PokeApi;
  private req: AxiosInstance;
  private readonly baseConfig: AxiosRequestConfig = {
    baseURL: "https://pokeapi.co/api/v2/",
    headers: {
      Accept: "application/json",
      Authorization: "",
      "Content-Type": "application/json",
    },
  }

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
  ): Data | Error {
    try {
      schema.parse(data);
    } catch (error: unknown) {
      if (!(error instanceof z.ZodError)) {
        throw error;
      } else if (process.env.VERCEL_ENV !== "production") {
        throw error;
      }
      console.warn("An schema must be correted", error);
    }
    return data;
  }

  public static getInstance(): PokeApi {
    if (PokeApi.instance === undefined) {
      PokeApi.instance = new PokeApi();
    }
    return PokeApi.instance;
  }


};

export const pokeApi = PokeApi.getInstance();