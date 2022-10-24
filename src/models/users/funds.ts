import { z } from "zod";
import { currenciesSchema } from "..";

export const userFundsSchema = z
  .object({
    userId: z.number().positive(),
    currency: currenciesSchema,
    funds: z.number().positive(),
    updatedAt: z.string(),
  })
  .strict();

export type UserFunds = z.infer<typeof userFundsSchema>;