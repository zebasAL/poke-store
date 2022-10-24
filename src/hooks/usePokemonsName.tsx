import { useState, useEffect } from "react";
import { PokeItem } from "../models";
import { PokemonServices } from "../services";

export const usePokemonsName = () => {
  const [allPokemonsName, setAllPokemonsName] = useState<Array<PokeItem | any>>([]);

  useEffect(() => {
    PokemonServices.getAllPokemonsName()
      .then((response: Array<PokeItem>) => {
        if (response.length) {
          setAllPokemonsName(response);
        };
      })
  }, []);

  return {
    allPokemonsName,
  }
};