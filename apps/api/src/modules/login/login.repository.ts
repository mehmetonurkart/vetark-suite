import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../infrastructure/database/database.service';
import type { SessionUser, StoredLoginUser } from './login.types';

interface LoginUserRow {
  id: number;
  username: string;
  password_hash: string;
  display_name: string;
  role: string;
}

@Injectable()
export class LoginRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByUsername(username: string): Promise<StoredLoginUser | null> {
    const result = await this.databaseService.query<LoginUserRow>(
      `
        SELECT id, username, password_hash, display_name, role
        FROM app_users
        WHERE LOWER(username) = LOWER($1)
        LIMIT 1;
      `,
      [username],
    );

    const row = result.rows[0];

    return row ? this.mapStoredUser(row) : null;
  }

  async findById(id: number): Promise<SessionUser | null> {
    const result = await this.databaseService.query<LoginUserRow>(
      `
        SELECT id, username, password_hash, display_name, role
        FROM app_users
        WHERE id = $1
        LIMIT 1;
      `,
      [id],
    );

    const row = result.rows[0];

    return row ? this.mapSessionUser(row) : null;
  }

  private mapStoredUser(row: LoginUserRow): StoredLoginUser {
    return {
      ...this.mapSessionUser(row),
      passwordHash: row.password_hash,
    };
  }

  private mapSessionUser(row: LoginUserRow): SessionUser {
    return {
      id: row.id,
      username: row.username,
      displayName: row.display_name,
      role: row.role,
    };
  }
}
