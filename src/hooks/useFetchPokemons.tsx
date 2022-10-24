import { useState, useEffect } from "react";
import axios from "axios";
import { toaster } from "evergreen-ui";
import { Pokemon } from "../models";
import { PokemonServices } from "../services";

const limitPokemons = 32;

export const useFectchPokemons = () => {
  const [pokemons, setPokemons] = useState<Array<Pokemon | any>>([]);
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
        setIsLoading(false);
        toaster.danger("Couldn't fetch pokemons", {
          description: "our pokeballs were not effective as we expected",
          id: "forbidden-action",
        })
      })
  }, [offset]);

  return {
    pokemons,
    isLoading,
    hasMore,
    limitPokemons,
    handleOffset,
    toaster,
  }
};