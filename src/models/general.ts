import { z } from "zod";

export const currenciesSchema = z.enum([
    "MXN",
    "USD",
])

export type Currencies = z.infer<typeof currenciesSchema>;
