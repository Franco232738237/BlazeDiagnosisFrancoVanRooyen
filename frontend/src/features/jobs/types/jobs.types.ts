export interface JobStatusHistoryRecord {
  id: string;
  fromStatus?: string;
  toStatus: string;
  changedByUserId: string;
  createdAt: string;
}

export interface JobRecord {
  id: string;
  tenantId: string;
  customerId: string;
  vehicleId: string;
  referenceNumber: string;
  status: string;
  customerComplaint: string;
  diagnosisSummary?: string;
  statusHistory?: JobStatusHistoryRecord[];
}
