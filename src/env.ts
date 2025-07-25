import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url().startsWith('postgresql://'),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_BUCKET_NAME: z.string(),
  CLOUDFLARE_BUCKET_PUBLIC_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
