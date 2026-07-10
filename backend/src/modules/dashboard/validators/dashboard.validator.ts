import { isObject } from '../../../shared/utils/validation';

export function validateDashboardInput(input: unknown) {
  if (!isObject(input)) {
    throw new Error('Dashboard payload is required.');
  }

  return input;
}
