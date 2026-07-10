declare const process: {
  env: Record<string, string | undefined>;
};

declare class Buffer {
  static from(input: string, encoding?: string): Buffer;
  length: number;
  toString(encoding?: string): string;
}

declare module 'crypto' {
  export interface Hmac {
    update(data: string): Hmac;
    digest(encoding: string): string;
  }

  export interface BinaryLike {
    length: number;
  }

  export function createHmac(algorithm: string, key: string): Hmac;
  export function randomBytes(size: number): { toString(encoding?: string): string };
  export function scryptSync(password: string, salt: string, keylen: number): Buffer;
  export function timingSafeEqual(a: BinaryLike, b: BinaryLike): boolean;
}
