import { createClient } from "@libsql/client";

const config = {
     url: process.env.TURSO_DATABASE_URL,
     authToken: process.env.TURSO_AUTH_TOKEN,
};

export const db = await createClient(config);