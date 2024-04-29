import { string, number, object } from "zod";

const productScheme = object({
     title: string(),
     imageUrl: string().url(),
     description: string().min(64),
     stock: number().positive(),
     category: string(),
     price: number().positive()
});

export function validateProduct({ input }) {
     return productScheme.safeParse(input);
}

export function validatePartialProduct({ input }) {
     return productScheme.partial().safeParse(input)
}