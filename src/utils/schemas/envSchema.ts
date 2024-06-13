import { z } from "zod";

export const envClientSchema = z.object({});

export const envServerSchema = envClientSchema.extend({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});
