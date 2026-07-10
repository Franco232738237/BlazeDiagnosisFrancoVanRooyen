export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function assertRequiredString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${fieldName} is required.`);
  }

  return value.trim();
}

export function assertOptionalString(value: unknown, fieldName: string): string | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string.`);
  }

  return value.trim();
}

export function assertOptionalNumber(value: unknown, fieldName: string): number | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`${fieldName} must be a number.`);
  }

  return value;
}

export function assertBoolean(value: unknown, fieldName: string, fallback = false): boolean {
  if (value === undefined || value === null) {
    return fallback;
  }

  if (typeof value !== 'boolean') {
    throw new Error(`${fieldName} must be a boolean.`);
  }

  return value;
}

export function assertEmail(value: unknown, fieldName: string): string {
  const email = assertRequiredString(value, fieldName).toLowerCase();

  if (!email.includes('@')) {
    throw new Error(`${fieldName} must be a valid email address.`);
  }

  return email;
}
