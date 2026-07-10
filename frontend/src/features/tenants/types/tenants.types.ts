export interface Tenant {
  id: string;
  name: string;
  slug: string;
  type: 'SERVICE_STATION' | 'SUPPLIER';
  isActive: boolean;
  contactEmail?: string;
  contactPhone?: string;
  createdAt?: string;
  updatedAt?: string;
}
