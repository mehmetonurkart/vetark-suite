import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { appEnv } from '../src/config/env';

async function setupLocalDatabase() {
  const pool = new Pool({
    connectionString: appEnv.databaseUrl,
  });

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS app_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(64) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        display_name VARCHAR(120) NOT NULL,
        role VARCHAR(40) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    const passwordHash = await bcrypt.hash('vetark4154', 12);

    await pool.query(
      `
        INSERT INTO app_users (username, password_hash, display_name, role)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO UPDATE
        SET password_hash = EXCLUDED.password_hash,
            display_name = EXCLUDED.display_name,
            role = EXCLUDED.role;
      `,
      ['vetark', passwordHash, 'Vetark Admin', 'admin'],
    );

    console.log('Local database is ready.');
    console.log('Demo login: vetark / vetark4154');
  } finally {
    await pool.end();
  }
}

void setupLocalDatabase();
