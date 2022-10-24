import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toaster } from "evergreen-ui";
import { PokemonAndSpecieMerged, PokemonSpecie } from "../models";
import { PokemonServices } from "../services";

type PokemonDescription = {
  description: string;
};

type Pokemon = PokemonAndSpecieMerged & PokemonDescription;

export const useFetchDetails = () => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [error, serError] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    PokemonServices.getPokemonFullData(Number(id))
      .then((response: Pokemon) => {

        if (!response.id) return serError(true);

        let description = "";
        if (response.flavor_text_entries?.length > 0) {
          description = response.flavor_text_entries.find((pokemon: PokemonSpecie["flavor_text_entries"][0]) => pokemon.language.name === "en")?.flavor_text ?? "";
        };
        setPokemon({ ...response, description });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        serError(true);
        toaster.warning("pokemon not found in our pokedex", {
          id: "forbidden-action",
        });
      })
  }, []);

  return {
    pokemon,
    error,
  }
};