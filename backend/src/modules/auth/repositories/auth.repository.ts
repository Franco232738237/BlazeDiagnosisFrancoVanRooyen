import { db, type AuthPasswordResetRecord, type AuthSessionRecord, type AuthUserRecord } from '../../../shared/store/in-memory-db';

export class AuthRepository {
  findByEmail(email: string): AuthUserRecord | undefined {
    return db.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }

  findById(id: string): AuthUserRecord | undefined {
    return db.users.find((user) => user.id === id);
  }

  touchLastLogin(userId: string): AuthUserRecord {
    const user = this.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    user.lastLoginAt = new Date();
    user.updatedAt = new Date();
    return user;
  }

  updatePassword(userId: string, passwordHash: string): AuthUserRecord {
    const user = this.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    user.passwordHash = passwordHash;
    user.updatedAt = new Date();
    return user;
  }

  createSession(input: AuthSessionRecord): AuthSessionRecord {
    db.authSessions.push(input);
    return input;
  }

  findSessionByRefreshToken(refreshToken: string): AuthSessionRecord | undefined {
    return db.authSessions.find((session) => session.refreshToken === refreshToken && !session.revokedAt);
  }

  revokeSessionByRefreshToken(refreshToken: string): boolean {
    const session = db.authSessions.find((item) => item.refreshToken === refreshToken && !item.revokedAt);
    if (!session) {
      return false;
    }

    session.revokedAt = new Date();
    return true;
  }

  revokeUserSessions(userId: string): number {
    let revoked = 0;
    db.authSessions.forEach((session) => {
      if (session.userId === userId && !session.revokedAt) {
        session.revokedAt = new Date();
        revoked += 1;
      }
    });
    return revoked;
  }

  createPasswordReset(input: AuthPasswordResetRecord): AuthPasswordResetRecord {
    db.passwordResets.push(input);
    return input;
  }

  findPasswordResetByToken(token: string): AuthPasswordResetRecord | undefined {
    return db.passwordResets.find((record) => record.token === token && !record.usedAt);
  }

  markPasswordResetUsed(token: string): AuthPasswordResetRecord {
    const record = this.findPasswordResetByToken(token);
    if (!record) {
      throw new Error('Reset token not found.');
    }

    record.usedAt = new Date();
    return record;
  }
}
