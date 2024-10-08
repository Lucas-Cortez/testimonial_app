import { z } from "zod";

export const envClientSchema = z.object({});

export const envServerSchema = envClientSchema.extend({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  GOOGLE_ID: z.string().trim(),
  GOOGLE_SECRET: z.string().trim(),
  DATABASE_URL: z.string().trim(),
  CLOUDINARY_CLOUD_NAME: z.string().trim(),
  CLOUDINARY_API_KEY: z.string().trim(),
  CLOUDINARY_API_SECRET: z.string().trim(),
});
