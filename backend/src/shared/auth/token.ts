import { createHmac, timingSafeEqual } from 'crypto';
import type { TenantType, UserRole } from '../store/in-memory-db';

export interface SignedTokenPayload {
  sub: string;
  tenantId: string;
  email: string;
  role: UserRole;
  type: 'access' | 'refresh' | 'reset';
  exp: number;
  branchId?: string;
  tenantType?: TenantType;
}

const SECRET = process.env.AUTH_SECRET || 'vehicle-service-platform-dev-secret';

function encode(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url');
}

function decode<T>(input: string): T {
  return JSON.parse(Buffer.from(input, 'base64url').toString('utf8')) as T;
}

export function signToken(payload: SignedTokenPayload): string {
  const header = encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = encode(JSON.stringify(payload));
  const signature = createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): SignedTokenPayload {
  const [header, body, signature] = token.split('.');
  if (!header || !body || !signature) {
    throw new Error('Invalid token format.');
  }

  const expected = createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
  const received = Buffer.from(signature);
  const compare = Buffer.from(expected);
  if (received.length !== compare.length || !timingSafeEqual(received, compare)) {
    throw new Error('Invalid token signature.');
  }

  const payload = decode<SignedTokenPayload>(body);
  if (payload.exp <= Date.now()) {
    throw new Error('Token has expired.');
  }

  return payload;
}
