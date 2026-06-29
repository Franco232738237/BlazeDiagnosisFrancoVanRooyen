import 'server-only';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://mock_user:mock_pass@localhost:5432/mock_db';


if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL is required to initialize the database client.',
  );
}


const pool = new Pool({
  connectionString: databaseUrl,
});

export const db = drizzle(pool, { schema });
