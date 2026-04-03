import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool, type QueryResult, type QueryResultRow } from 'pg';
import { appEnv } from '../../config/env';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool = new Pool({
    connectionString: appEnv.databaseUrl,
  });

  query<TRow extends QueryResultRow>(
    text: string,
    values: readonly unknown[] = [],
  ): Promise<QueryResult<TRow>> {
    return this.pool.query<TRow>(text, [...values]);
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
