import { config } from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '../', '.env') })

export const PORT = process.env.PORT || 3000
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const URI = process.env.URI