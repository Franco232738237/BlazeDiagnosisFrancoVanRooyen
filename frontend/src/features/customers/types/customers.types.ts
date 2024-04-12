export interface CustomerRecord {
  id: string;
  tenantId: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  preferredCommunicationChannel?: 'EMAIL' | 'SMS' | 'WHATSAPP';
  marketingConsent: boolean;
  createdAt?: string;
  updatedAt?: string;
}
