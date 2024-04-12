import type { CustomerEntity } from '../../modules/customers/entities/customer.entity';
import type { VehicleEntity } from '../../modules/vehicles/entities/vehicle.entity';
import type { JobEntity } from '../../modules/jobs/entities/job.entity';
import type { QuoteEntity } from '../../modules/quotes/entities/quote.entity';
import type { TenantSettings } from '../../modules/tenants/entities/tenant.entity';
import type { UserPreferences, UserStatus } from '../../modules/users/entities/user.entity';
import { createToken } from '../utils/id';
import { now } from '../utils/date';
import { hashPassword } from '../auth/password';

export type UserRole = 'OWNER' | 'ADMIN' | 'ADVISOR' | 'MECHANIC' | 'CASHIER' | 'SUPPLIER_ADMIN' | 'SUPPLIER_SALES' | 'SUPPLIER_WAREHOUSE' | 'POS_OPERATOR';
export type TenantType = 'SERVICE_STATION' | 'SUPPLIER';

export interface TenantRecord {
  id: string;
  name: string;
  slug: string;
  type: TenantType;
  isActive: boolean;
  contactEmail?: string;
  contactPhone?: string;
  legalName?: string;
  registrationNumber?: string;
  defaultBranchId?: string;
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUserRecord {
  id: string;
  tenantId: string;
  branchId?: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title?: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  isActive: boolean;
  inviteAcceptedAt?: Date;
  lastLoginAt?: Date;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSessionRecord {
  id: string;
  userId: string;
  tenantId: string;
  refreshToken: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: Date;
}

export interface AuthPasswordResetRecord {
  id: string;
  userId: string;
  tenantId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  usedAt?: Date;
}

export interface QuoteLineRecord {
  id: string;
  quoteId: string;
  type: 'LABOR' | 'PART';
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface JobStatusHistoryRecord {
  id: string;
  jobId: string;
  fromStatus?: string;
  toStatus: string;
  changedByUserId: string;
  createdAt: Date;
}

const defaultTenantSettings: TenantSettings = {
  timezone: 'Africa/Johannesburg',
  currencyCode: 'ZAR',
  countryCode: 'ZA',
  taxRatePercent: 15,
  dateFormat: 'YYYY-MM-DD',
  requirePaymentBeforeCollection: true,
};

export const db = {
  tenants: [
    {
      id: 'tenant_demo',
      name: 'Demo Workshop',
      slug: 'demo-workshop',
      type: 'SERVICE_STATION' as const,
      isActive: true,
      contactEmail: 'admin@demo-workshop.local',
      contactPhone: '+27110000000',
      legalName: 'Demo Workshop (Pty) Ltd',
      registrationNumber: '2025/000001/07',
      settings: defaultTenantSettings,
      createdAt: now(),
      updatedAt: now(),
    },
  ] as TenantRecord[],
  users: [
    {
      id: 'user_admin_demo',
      tenantId: 'tenant_demo',
      branchId: 'branch_demo_1',
      fullName: 'Demo Workshop Admin',
      firstName: 'Demo',
      lastName: 'Admin',
      email: 'admin@demo-workshop.local',
      phone: '+27110000000',
      title: 'Workshop Administrator',
      passwordHash: hashPassword('demo1234'),
      role: 'ADMIN' as const,
      status: 'ACTIVE' as const,
      isActive: true,
      inviteAcceptedAt: now(),
      preferences: {
        locale: 'en-ZA',
        timezone: 'Africa/Johannesburg',
        defaultBranchId: 'branch_demo_1',
      },
      createdAt: now(),
      updatedAt: now(),
    },
  ] as AuthUserRecord[],
  authSessions: [] as AuthSessionRecord[],
  passwordResets: [] as AuthPasswordResetRecord[],
  customers: [
    {
      id: 'cust_demo_1',
      tenantId: 'tenant_demo',
      fullName: 'Ben Henning',
      mobileNumber: '+27110000001',
      email: 'benhenning10@gmail.com',
      marketingConsent: true,
      preferredCommunicationChannel: 'EMAIL',
      createdAt: now(),
      updatedAt: now(),
    },
  ] as CustomerEntity[],
  vehicles: [
    {
      id: 'veh_demo_1',
      tenantId: 'tenant_demo',
      customerId: 'cust_demo_1',
      registrationNumber: 'CA123456',
      vin: 'VINDEMO123456789',
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      fuelType: 'Petrol',
      transmission: 'Manual',
      odometer: 84500,
      createdAt: now(),
      updatedAt: now(),
    },
  ] as VehicleEntity[],
  jobs: [
    {
      id: 'job_demo_1',
      tenantId: 'tenant_demo',
      customerId: 'cust_demo_1',
      vehicleId: 'veh_demo_1',
      referenceNumber: 'JOB-1001',
      status: 'AWAITING_CUSTOMER_APPROVAL',
      customerComplaint: 'Brake pads worn and service light on.',
      diagnosisSummary: 'Front pads and minor service required.',
      createdAt: now(),
      updatedAt: now(),
    },
  ] as JobEntity[],
  quotes: [
    {
      id: 'quote_demo_1',
      tenantId: 'tenant_demo',
      jobId: 'job_demo_1',
      version: 1,
      status: 'SENT',
      subtotal: 1950,
      taxAmount: 292.5,
      discountAmount: 0,
      total: 2242.5,
      publicToken: createToken('quote'),
      createdAt: now(),
      updatedAt: now(),
    },
  ] as QuoteEntity[],
  quoteLines: [
    {
      id: 'ql_demo_1',
      quoteId: 'quote_demo_1',
      type: 'LABOR',
      description: 'Minor service labor',
      quantity: 1,
      unitPrice: 850,
      total: 850,
    },
    {
      id: 'ql_demo_2',
      quoteId: 'quote_demo_1',
      type: 'PART',
      description: 'Front brake pads',
      quantity: 1,
      unitPrice: 1100,
      total: 1100,
    },
  ] as QuoteLineRecord[],
  jobStatusHistory: [
    {
      id: 'jsh_demo_1',
      jobId: 'job_demo_1',
      fromStatus: 'QUOTATION_IN_PROGRESS',
      toStatus: 'AWAITING_CUSTOMER_APPROVAL',
      changedByUserId: 'user_admin_demo',
      createdAt: now(),
    },
  ] as JobStatusHistoryRecord[],
};

export function createAuditTimestamps() {
  return {
    createdAt: now(),
    updatedAt: now(),
  };
}

export function createReference(prefix: string, currentLength: number): string {
  return `${prefix}-${String(currentLength + 1001).padStart(4, '0')}`;
}

export function nextEntityId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
