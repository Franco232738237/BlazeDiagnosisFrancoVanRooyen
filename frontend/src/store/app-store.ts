import type { AuthSessionState } from '../features/auth/types/auth.types';

export interface AppStoreState {
  tenantId?: string;
  userId?: string;
  auth?: AuthSessionState;
}

export const initialAppStoreState: AppStoreState = {};
