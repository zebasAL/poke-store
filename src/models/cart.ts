import { z } from "zod";

const productSchema = z
  .object({
    id: z.number().positive(),
    quantity: z.number().positive(),
    image: z.string().startsWith("https"),
    title: z.string(),
    price: z.number().positive(),
  })
  .strict();

const cartSchema = z
  .object({
    date: z.string(),
    id: z.number().positive(),
    userId: z.number().positive(),
    products: z.array(productSchema),
  })
  .strict();

export type ProductCart = z.infer<typeof productSchema>;
export type Cart = z.infer<typeof cartSchema>;