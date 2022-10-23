import { z } from "zod";
import { currenciesSchema } from "../";

export const userFoundsSchema = z
  .object({
    userId: z.number().positive(),
    currency: currenciesSchema,
    founds: z.number().positive(),
    updatedAt: z.string(),
  })
  .strict();

export type UserFounds = z.infer<typeof userFoundsSchema>;