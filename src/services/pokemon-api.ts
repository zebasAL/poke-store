import { pokeApi } from "../api";
import type { AxiosRequestConfig } from "axios";
import { getFulfilledData } from "../adapters";

type Cancel = {
    token: AxiosRequestConfig["cancelToken"];
};

export const PokemonServices = {
    getAllPokemonsName: async () => await pokeApi.getAllPokemonsName(),
    getPokemon: async (id: number,  cancelToken?: Cancel) => {
        const [response] = await pokeApi.getPokemons(1, id, cancelToken);
        if (response?.id) return response;
    },
    getPokemonsByOffset: async (limit: number, offset: number, cancelToken?: Cancel) => await pokeApi.getPokemons(limit, offset, cancelToken),
    getPokemonSpecie: async (id: number | string, cancelToken?: Cancel) => await pokeApi.getPokemonSpecie(id, cancelToken),
    getPokemonFullData: async (id: number, cancelToken?: Cancel) => {
        const response = await Promise.allSettled([
            PokemonServices.getPokemon(id , cancelToken),
            PokemonServices.getPokemonSpecie(id, cancelToken),
        ]);
        const [pokemon, specie] = getFulfilledData(response)
        return {
            ...pokemon,
            ...specie,
        };
    },
};