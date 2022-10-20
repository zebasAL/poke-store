import { z } from "zod";
import { pokeItemSchema, imageUrlSchema, pokemonAbilitySchema, pokemonStatsSchema } from "./index";

export const pokemonSchema = z
  .object({
    price: z.number().positive().optional(),
    abilities: z.array(pokemonAbilitySchema),
    base_experience: z.number().positive(),
    /**
     * Every evolution or form related to same specie
     */
    forms: z.array(pokeItemSchema),
    height: z.number().positive(),
    id: z.number().positive(),
    is_default: z.boolean(),
    name: z.string(),
    order: z.number().positive(),
    species: pokeItemSchema,
    moves: z.array(z.
      object({
        move: pokeItemSchema
      })),
    sprites: z.
      object({
        back_default: imageUrlSchema,
        back_female: imageUrlSchema,
        back_shiny: imageUrlSchema,
        back_shiny_female: imageUrlSchema,
        front_default: imageUrlSchema,
        front_female: imageUrlSchema,
        front_shiny: imageUrlSchema,
        front_shiny_female: imageUrlSchema,
      }),
    stats: z.array(pokemonStatsSchema),
    weight: z.number().nullable(),
  })
  .strict();

export type Pokemon = z.infer<typeof pokemonSchema>;