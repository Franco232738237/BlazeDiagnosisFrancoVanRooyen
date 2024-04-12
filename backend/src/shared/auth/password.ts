import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const SCRYPT_KEYLEN = 64;

export function hashPassword(password: string, salt = randomBytes(16).toString('hex')): string {
  const derivedKey = scryptSync(password, salt, SCRYPT_KEYLEN).toString('hex');
  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, originalKey] = storedHash.split(':');
  if (!salt || !originalKey) {
    return false;
  }

  const derivedKey = scryptSync(password, salt, SCRYPT_KEYLEN);
  const originalBuffer = Buffer.from(originalKey, 'hex');
  if (originalBuffer.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(originalBuffer, derivedKey);
}
