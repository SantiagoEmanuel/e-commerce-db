import { object, string } from 'zod';

const userScheme = object({
     username: string().min(5),
     first_name: string(),
     last_name: string(),
     email: string().email(),
     password: string().min(8).max(64),
     status: string().default('user')
})

export function validateUser({ input }) {
     return userScheme.safeParse(input);
}