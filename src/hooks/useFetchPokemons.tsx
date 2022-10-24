import { useState, useEffect } from "react";
import axios from "axios";
import { toaster } from "evergreen-ui";
import { Pokemon, PokeItem } from "../models";
import { PokemonServices } from "../services";

const limitPokemons = 32;

export const useFectchPokemons = () => {
  const [pokemons, setPokemons] = useState<Array<Pokemon | any>>([]);
  const [allPokemonsName, setAllPokemonsName] = useState<Array<PokeItem>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(1);

  const handleOffset = () => {
    const newOffset = pokemons.reduce((prev, current) => prev > current.id ? prev : current.id, 0);
    setOffset(newOffset + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    PokemonServices.getPokemonsByOffset(limitPokemons, offset)
      .then((response: Array<Pokemon | undefined>) => {
        if (response.length) {
          setPokemons((prevSate) => [...new Set([ ...prevSate, ...response])]);
        } else {
          setHasMore(false);
        }
        setIsLoading(false); 
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setIsLoading(false);
        toaster.danger("Couldn't fetch pokemons", {
          description: "our pokeballs were not effective as we expected",
          id: "forbidden-action",
        })
      })
  }, [offset]);

  useEffect(() => {
    PokemonServices.getAllPokemonsName()
      .then((response: Array<PokeItem>) => {
        if (response.length) {
          setAllPokemonsName(response);
        };
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
      })
  }, []);

  return {
    allPokemonsName,
    pokemons,
    isLoading,
    hasMore,
    limitPokemons,
    handleOffset,
    toaster,
  }
};