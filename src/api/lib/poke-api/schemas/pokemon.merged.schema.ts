import { z } from "zod";
import { pokemonSchema, pokemonSpecieSchema } from "./index";

export  const pokemonAndSpecieMergedSchema = pokemonSchema.merge(pokemonSpecieSchema);

export type PokemonAndSpecieMerged = z.infer<typeof pokemonAndSpecieMergedSchema>;
