export interface CreateCustomerDto {
  tenantId: string;
  fullName: string;
  mobileNumber: string;
  alternateNumber?: string;
  email?: string;
  address?: string;
  companyName?: string;
  taxNumber?: string;
  preferredCommunicationChannel?: 'EMAIL' | 'SMS' | 'WHATSAPP';
  marketingConsent?: boolean;
}

export interface UpdateCustomerDto extends Partial<CreateCustomerDto> {}
