import type { CustomerRecord } from '../types/customers.types';

const demoCustomers: CustomerRecord[] = [
  {
    id: 'cust_demo_1',
    tenantId: 'tenant_demo',
    fullName: 'Ben Henning',
    mobileNumber: '+27110000001',
    email: 'benhenning10@gmail.com',
    preferredCommunicationChannel: 'EMAIL',
    marketingConsent: true,
  },
];

export function CustomersPanel() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {demoCustomers.map((customer) => (
        <div key={customer.id} style={{ border: '1px solid #e5e7eb', padding: 16, borderRadius: 12 }}>
          <strong>{customer.fullName}</strong>
          <div>{customer.mobileNumber}</div>
          <div>{customer.email}</div>
        </div>
      ))}
    </div>
  );
}
