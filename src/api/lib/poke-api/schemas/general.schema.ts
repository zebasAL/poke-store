import { z } from "zod";

export const imageExtensionsSchema = z.enum([
  ".png",
  ".jpg",
  ".svg",
])
export type ImageExtensions = z.infer<typeof imageExtensionsSchema>;

export const imageUrlSchema = z.string().startsWith("https").endsWith(typeof imageExtensionsSchema).nullable();
export type ImageUrl = z.infer<typeof imageUrlSchema>;

export const pokeItemSchema = z
  .object({
    name: z.string(),
    url: z.string().startsWith("https").endsWith("/"),
  })
  .strict();

export type PokeItem = z.infer<typeof pokeItemSchema>;

export const pokemonAbilitySchema = z
  .object({
    ability: pokeItemSchema,
    is_hidden: z.boolean(),
    slot: z.number(),
  })
  .strict();

export type PokemonAbility = z.infer<typeof pokemonAbilitySchema>;

export const pokemonStatsSchema = z
  .object({
    base_stat: z.number().positive().nullable(),
    effort: z.number().positive().nullable(),
    stat: pokeItemSchema,
  })
  .strict();

export type PokemonStats = z.infer<typeof pokemonStatsSchema>;
