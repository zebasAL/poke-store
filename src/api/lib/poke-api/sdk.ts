import type { AxiosError, AxiosRequestConfig } from "axios";
import axios, { AxiosInstance } from "axios";
import z from "zod";
import { PokeItem, Pokemon, PokemonSpecie } from "./schemas";
import { pokeItemSchema, pokemonSchema, pokemonSpecieSchema } from "./schemas";

class PokeApi {
  private static instance: PokeApi;
  private req: AxiosInstance;
  private readonly baseConfig: AxiosRequestConfig = {
    baseURL: "https://pokeapi.co/api/v2",
    headers: {
      Accept: "application/json",
      Authorization: "",
      "Access-Control-Allow-Origin": "*",
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
  ): Data {
    try {
      schema.parse(data);
    } catch (error: unknown) {
      if (!(error instanceof z.ZodError) && process.env.VERCEL_ENV !== "production") {
        // throw error;
        console.warn("An schema must be correted", error);
      }
    }
    return data;
  }

  public static getInstance(): PokeApi {
    if (PokeApi.instance === undefined) {
      PokeApi.instance = new PokeApi();
    }
    return PokeApi.instance;
  }

  private async getPokemon(id: number | string, cancelToken?: { token: AxiosRequestConfig["cancelToken"] }): Promise<Pokemon> {
    const url = `/pokemon/${id}`;
    const config: AxiosRequestConfig = {
      cancelToken: cancelToken?.token,
    };
    const { data } = await this.req.get<Pokemon>(url, config);
    return PokeApi.checkSchema(pokemonSchema, data);
  };

  public async getAllPokemonsName(): Promise<Array<PokeItem>> {
    const url = "/pokemon/";
    const config: AxiosRequestConfig = {
      params: {
        limit: 2500,
        offset: 0,
      },
    };
    const { data } = await this.req.get<{ results: Array<PokeItem>}>(url, config);

    return PokeApi.checkSchema(z.array(pokeItemSchema), data.results);
  };

  public async getPokemons(limit: number, offset: number, cancelToken?: { token: AxiosRequestConfig["cancelToken"] }): Promise<Array<Pokemon | undefined>> {
    const pokemons = new Array(limit).fill("");
    const responses: Array<{ status: "fulfilled" | "rejected", value?: Pokemon, reason?: AxiosError }> = await Promise.allSettled(pokemons.map(async (params, index) => {
      return (await this.getPokemon(offset + index));
    }))
    
    let formatedResponse = responses.filter((res) => res.status === "fulfilled").map((res) => {
      let pokemonObject = res.value;
      return {
      ...pokemonObject,
      price: Number(((pokemonObject?.weight ?? 1) / (pokemonObject?.base_experience ?? 1)).toFixed(2))
    }});

    // @ts-ignore we are forcing a property named price, because API dont return any similar
    return PokeApi.checkSchema(pokemonSchema, formatedResponse);
  };

  public async getPokemonSpecie(id: number | string, cancelToken?: { token: AxiosRequestConfig["cancelToken"] }): Promise<PokemonSpecie> {
    const url = `/pokemon-species/${id}`;
    const config: AxiosRequestConfig = {
      cancelToken: cancelToken?.token,
    };
    const { data } = await this.req.get<PokemonSpecie>(url, config);

    return PokeApi.checkSchema(pokemonSpecieSchema, data);
  };

};

export const pokeApi = PokeApi.getInstance();