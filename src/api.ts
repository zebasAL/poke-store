import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2/';

const api = {
  getPokemon: (id: number | string) => axios.get(`${baseUrl}pokemon/${id}`),
  getPokemonSpecies: (id: number | string) => axios.get(`${baseUrl}pokemon-species/${id}`),
  searchPokemon: (searchValue: string) => axios.get(`https://pokeapi.co/api/v2/pokemon/${searchValue.toLowerCase()}`),
  getPokemons: (numberOfPokemonsDisplayed: number) => axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemonsDisplayed}&offset=0`),
};

export default api;
