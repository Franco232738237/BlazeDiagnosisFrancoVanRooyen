# BlazeDiagnosis: Invoice, Notification & Audit Schema Review
## Plus Invoice Generation Implementation Plan

**Document Date:** June 15, 2026  
**For:** BlazeDiagnosis Workshop Management System  
**Applicable to:** All Student Groups (SE1, SE2, SD1, SD2, Cloud Admin, Cyber Security)

---

## PART 1: CURRENT SCHEMA ANALYSIS & RECOMMENDATIONS

### 1.1 INVOICE SCHEMA

#### Current State Assessment
The invoice system in BlazeDiagnosis must track:
- Invoice generation from job completions
- Line items (labor, parts, diagnostics fees)
- Tax calculations (VAT/GST applicable in South Africa)
- Invoice status (draft, issued, paid, overdue, cancelled)
- Client/mechanic approval workflows
- Payment terms and due dates

#### Proposed Invoice Schema Structure

```prisma
model Invoice {
  id                String    @id @default(cuid())
  invoiceNumber     String    @unique          // Auto-generated sequential number
  
  // Relationships
  jobId             String
  job               VehicleJob @relation(fields: [jobId], references: [id], onDelete: Cascade)
  customerId        String
  customer          Customer @relation(fields: [customerId], references: [id])
  workshopId        String
  workshop          Workshop @relation(fields: [workshopId], references: [id])
  
  // Invoice Details
  issueDate         DateTime  @default(now())
  dueDate           DateTime
  paidDate          DateTime?
  
  // Financial Data
  subtotal          Decimal   @db.Decimal(10, 2)  // Total before tax
  taxAmount         Decimal   @db.Decimal(10, 2)  // VAT/GST
  totalAmount       Decimal   @db.Decimal(10, 2)  // After tax
  paidAmount        Decimal   @db.Decimal(10, 2)  @default(0)
  balanceDue        Decimal   @db.Decimal(10, 2)
  
  // Invoice Status
  status            InvoiceStatus              // draft, issued, sent, viewed, overdue, paid, cancelled
  paymentStatus     PaymentStatus              // unpaid, partial, paid
  
  // Invoice Lines
  lineItems         InvoiceLineItem[]
  
  // Metadata
  notes             String?
  internalNotes     String?
  termsAndConditions String?
  
  // Audit Trail
  createdBy         String
  createdAt         DateTime  @default(now())
  updatedBy         String
  updatedAt         DateTime  @updatedAt
  cancelledBy       String?
  cancelledAt       DateTime?
  cancelReason      String?
  
  // Notifications
  notifications     Notification[]
  
  // Audit Events
  auditLogs         AuditLog[] @relation("InvoiceAudit")
  
  @@index([customerId])
  @@index([jobId])
  @@index([workshopId])
  @@index([status])
  @@index([paymentStatus])
  @@index([dueDate])
  @@fulltext([invoiceNumber, notes])  // For search functionality
}

model InvoiceLineItem {
  id              String    @id @default(cuid())
  invoiceId       String
  invoice         Invoice   @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
  
  // Line Item Details
  description     String              // Labor, parts, diagnostics, etc.
  quantity        Decimal   @db.Decimal(10, 2)
  unitPrice       Decimal   @db.Decimal(10, 2)
  lineTotal       Decimal   @db.Decimal(10, 2)  // quantity * unitPrice
  
  // Categorization
  itemType        InvoiceItemType     // labor, parts, diagnostics, other
  partId          String?             // Link to Parts if applicable
  part            Part?     @relation(fields: [partId], references: [id])
  
  // Job Labor Reference
  jobLaborId      String?             // Link to job labor records
  
  // Metadata
  notes           String?
  taxable         Boolean   @default(true)
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([invoiceId])
  @@index([itemType])
}

enum InvoiceStatus {
  DRAFT           // Not yet issued
  ISSUED          // Created and ready to send
  SENT            // Sent to customer
  VIEWED          // Customer has viewed
  OVERDUE         // Past due date
  PAID            // Fully paid
  PARTIAL_PAID    // Partially paid
  CANCELLED       // Cancelled, not to be paid
  REFUNDED        // Refunded after payment
}

enum PaymentStatus {
  UNPAID          // No payments received
  PARTIAL         // Some amount paid
  PAID            // Fully paid
}

enum InvoiceItemType {
  LABOR           // Mechanic labor
  PARTS           // Vehicle parts/supplies
  DIAGNOSTICS     // Diagnostics fee
  SERVICE_FEE     // Service charges
  OTHER           // Miscellaneous
}
```

#### Invoice Schema Validations & Business Rules

- **Invoice Number:** Auto-generated, format: WS-YYYY-MM-00001 (workshop-year-month-sequence)
- **Tax Calculation:** Must support configurable tax rates by jurisdiction (South Africa VAT = 15%)
- **Due Date:** Configurable per customer (e.g., 30 days from issue date)
- **Balance Due:** `totalAmount - paidAmount`, must remain >= 0
- **Status Transitions:**
  - DRAFT → ISSUED → SENT → VIEWED → PAID (or OVERDUE)
  - PAID → REFUNDED (if refund issued)
  - Any status → CANCELLED (with reason logged)

---

### 1.2 NOTIFICATION SCHEMA

#### Notification Types for BlazeDiagnosis
1. **Invoice Notifications** (customer, finance)
2. **Payment Notifications** (payment received, overdue reminders)
3. **Job Status Updates** (progress, completion)
4. **Approval Notifications** (quote approval, job authorization)
5. **System Notifications** (errors, alerts)

#### Proposed Notification Schema

```prisma
model Notification {
  id                String    @id @default(cuid())
  
  // Recipient & Type
  userId            String
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  type              NotificationType
  priority          NotificationPriority @default(NORMAL)
  
  // Content
  title             String
  message           String
  templateId        String?   // Reference to template
  
  // Related Entities
  invoiceId         String?
  invoice           Invoice?  @relation(fields: [invoiceId], references: [id], onDelete: SetNull)
  jobId             String?
  vehicleJob        VehicleJob? @relation(fields: [jobId], references: [id], onDelete: SetNull)
  
  // Delivery Channels
  channels          NotificationChannel[] // email, sms, in_app, push
  
  // Status
  status            NotificationStatus @default(PENDING)
  sentAt            DateTime?
  readAt            DateTime?
  acknowledgedAt    DateTime?
  
  // Metadata
  actionUrl         String?   // Link to take action (e.g., view invoice)
  metadata          Json?     // Additional context as JSON
  
  // Retry Logic
  attemptCount      Int       @default(0)
  lastAttemptAt     DateTime?
  nextRetryAt       DateTime?
  
  // Audit
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([userId])
  @@index([status])
  @@index([type])
  @@index([invoiceId])
  @@index([jobId])
  @@index([sentAt])
}

model NotificationTemplate {
  id                String    @id @default(cuid())
  name              String    @unique
  type              NotificationType
  description       String?
  
  // Template Content
  emailSubject      String?
  emailBody         String    // HTML template
  smsBody           String?   // Max 160 chars
  pushTitle         String?
  pushBody          String?
  
  // Template Variables (e.g., {{customerName}}, {{invoiceNumber}})
  variables         String[]  @default([])
  
  // Configuration
  enabled           Boolean   @default(true)
  isSystemDefault   Boolean   @default(false)
  workshopId        String?   // Null = system template
  workshop          Workshop? @relation(fields: [workshopId], references: [id])
  
  // Metadata
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([type])
  @@index([workshopId])
}

model NotificationPreference {
  id                String    @id @default(cuid())
  userId            String    @unique
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Channel Preferences
  emailEnabled      Boolean   @default(true)
  smsEnabled        Boolean   @default(false)
  inAppEnabled      Boolean   @default(true)
  pushEnabled       Boolean   @default(false)
  
  // Notification Type Preferences
  invoiceNotifications    Boolean @default(true)
  paymentNotifications    Boolean @default(true)
  jobUpdates              Boolean @default(true)
  approvalRequests        Boolean @default(true)
  systemAlerts            Boolean @default(true)
  
  // Frequency
  digestFrequency   DigestFrequency @default(IMMEDIATE)  // immediate, daily, weekly
  quietHours        String?   // JSON: {startTime: "18:00", endTime: "08:00"}
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([userId])
}

enum NotificationType {
  INVOICE_CREATED
  INVOICE_SENT
  INVOICE_VIEWED
  PAYMENT_RECEIVED
  PAYMENT_OVERDUE
  QUOTE_APPROVAL_NEEDED
  JOB_STARTED
  JOB_COMPLETED
  PARTS_ARRIVED
  PARTS_ORDERED
  APPROVAL_STATUS_CHANGED
  SYSTEM_ERROR
  SYSTEM_ALERT
  CUSTOM
}

enum NotificationChannel {
  EMAIL
  SMS
  IN_APP
  PUSH_NOTIFICATION
  WEBHOOK
}

enum NotificationStatus {
  PENDING           // Queued for sending
  SENT              // Successfully sent
  DELIVERED         // Confirmed delivered (for SMS/push)
  FAILED            // Failed to send
  BOUNCED           // Email bounced
  READ              // User read the notification
  ACKNOWLEDGED      // User acknowledged/acted on it
}

enum NotificationPriority {
  LOW
  NORMAL
  HIGH
  URGENT
}

enum DigestFrequency {
  IMMEDIATE
  DAILY
  WEEKLY
}
```

#### Notification Implementation Requirements

**Queue System:**
- Use job queue (Bull, RabbitMQ, or similar) for async notification delivery
- Implement retry logic with exponential backoff
- Track delivery status for compliance

**Templates:**
- Support Handlebars or similar templating for dynamic content
- Allow workshop customization of templates
- Maintain audit trail of template changes

**Channels:**
- Email: SMTP integration with bounce handling
- SMS: Twilio or local SMS provider integration
- In-App: Real-time via WebSocket or polling
- Push: Native mobile app notifications

---

### 1.3 AUDIT LOG SCHEMA

#### Audit Requirements
- **Compliance:** Track all financial transactions for audit purposes
- **Security:** Log all user actions on sensitive data
- **Accountability:** Know who did what, when, and why
- **Dispute Resolution:** Provide evidence for customer disputes

#### Proposed Audit Schema

```prisma
model AuditLog {
  id                String    @id @default(cuid())
  
  // Actor
  userId            String    // User who performed the action
  user              User      @relation(fields: [userId], references: [id], onDelete: Restrict)
  ipAddress         String?
  userAgent         String?   // Browser/client info
  
  // Action
  action            AuditAction
  resource          AuditResource   // What was affected (Invoice, Job, Payment, etc.)
  resourceId        String          // ID of the resource
  
  // Relationships
  invoiceId         String?   @db.Indexed
  jobId             String?   @db.Indexed
  customerId        String?   @db.Indexed
  workshopId        String    @db.Indexed
  
  // Changes
  changeType        ChangeType      // create, update, delete
  oldValues         Json?           // Previous state (encrypted if PII)
  newValues         Json?           // New state (encrypted if PII)
  changedFields     String[]        // Which fields changed
  
  // Status
  status            AuditStatus     // success, failure, unauthorized
  errorMessage      String?         // If failed
  
  // Context
  description       String?         // Human-readable description
  reason            String?         // Why the action was taken (if applicable)
  metadata          Json?           // Additional context
  
  // Timestamps
  createdAt         DateTime  @default(now())  // When it happened
  
  // Data Privacy
  isHighRisk        Boolean   @default(false) // Flag sensitive actions
  dataClassification DataClassification @default(INTERNAL)
  
  @@index([userId])
  @@index([action])
  @@index([resource])
  @@index([resourceId])
  @@index([workshopId])
  @@index([createdAt])
  @@index([isHighRisk])
  
  // Composite indexes for common queries
  @@index([workshopId, createdAt])
  @@index([invoiceId, action])
}

model AuditReport {
  id                String    @id @default(cuid())
  workshopId        String
  workshop          Workshop  @relation(fields: [workshopId], references: [id])
  
  name              String
  reportType        AuditReportType
  
  // Report Configuration
  startDate         DateTime
  endDate           DateTime
  filters           Json?     // Applied filters
  
  // Report Data
  generatedAt       DateTime  @default(now())
  generatedBy       String
  totalRecords      Int
  
  // Storage
  fileUrl           String?   // S3 or similar storage
  fileFormat        String    @default("pdf")  // pdf, csv, json
  
  // Metadata
  createdAt         DateTime  @default(now())
  expiresAt         DateTime? // When report can be deleted (retention policy)
  
  @@index([workshopId])
  @@index([reportType])
}

enum AuditAction {
  // Invoice Actions
  INVOICE_CREATED
  INVOICE_UPDATED
  INVOICE_SENT
  INVOICE_VIEWED
  INVOICE_CANCELLED
  INVOICE_REFUNDED
  
  // Payment Actions
  PAYMENT_RECEIVED
  PAYMENT_RECORDED
  PAYMENT_REVERSED
  
  // Job Actions
  JOB_CREATED
  JOB_UPDATED
  JOB_APPROVED
  JOB_COMPLETED
  
  // User Actions
  LOGIN
  LOGOUT
  USER_CREATED
  USER_UPDATED
  USER_DELETED
  PERMISSIONS_CHANGED
  
  // System Actions
  CONFIG_CHANGED
  DATA_EXPORT
  DATA_IMPORT
  BACKUP_CREATED
  BACKUP_RESTORED
  
  // Security Actions
  FAILED_LOGIN_ATTEMPT
  UNAUTHORIZED_ACCESS_ATTEMPT
  API_KEY_CREATED
  API_KEY_REVOKED
}

enum AuditResource {
  INVOICE
  PAYMENT
  JOB
  CUSTOMER
  VEHICLE
  USER
  WORKSHOP
  PART
  QUOTE
  NOTIFICATION
  SETTINGS
  REPORT
}

enum ChangeType {
  CREATE
  UPDATE
  DELETE
  RESTORE
}

enum AuditStatus {
  SUCCESS
  FAILURE
  PARTIAL
  UNAUTHORIZED
  TIMEOUT
}

enum DataClassification {
  PUBLIC
  INTERNAL
  CONFIDENTIAL
  RESTRICTED         // PII, Financial data, etc.
}

enum AuditReportType {
  FINANCIAL
  USER_ACTIVITY
  DATA_CHANGES
  SECURITY
  COMPLIANCE
  CUSTOM
}

// Configuration model for audit retention policies
model AuditConfiguration {
  id                String    @id @default(cuid())
  workshopId        String    @unique
  workshop          Workshop  @relation(fields: [workshopId], references: [id])
  
  // Retention
  retentionDays     Int       @default(2555)   // 7 years for financial
  archiveAfterDays  Int       @default(365)    // Archive to cold storage
  
  // Logging
  logHighRiskOnly   Boolean   @default(false)
  captureOldValues  Boolean   @default(true)
  captureNewValues  Boolean   @default(true)
  
  // Compliance
  encryptSensitiveData Boolean @default(true)
  complianceMode    Boolean   @default(true)   // Stricter logging
  
  updatedAt         DateTime  @updatedAt
  
  @@index([workshopId])
}
```

#### Audit Implementation Best Practices

**Data Sensitivity:**
- Encrypt PII and financial data in `oldValues` and `newValues`
- Use separate secure logging for sensitive actions
- Implement access controls on audit logs

**Performance:**
- Use database partitioning by date
- Archive old audit logs to cold storage
- Create indexes on frequently queried fields

**Compliance:**
- Cannot delete audit logs once created (append-only)
- Support GDPR right-to-be-forgotten with anonymization
- Generate reports for compliance audits

---

## PART 2: INVOICE GENERATION IMPLEMENTATION PLAN

### 2.1 Architecture Overview

```
┌─────────────────┐
│  Job Completion │  (Trigger: Job marked complete)
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│ Calculate Invoice Totals    │  (Labor + Parts + Fees)
│ - Gather job labor hours    │
│ - Collect parts used        │
│ - Apply diagnostics fee     │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ Apply Tax Calculations      │  (VAT 15% in ZA)
│ - Calculate taxable items   │
│ - Apply exemptions (if any) │
│ - Round appropriately       │
└────────┬────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Generate Invoice Number      │  (WS-YYYY-MM-NNNNN)
│ & Create Invoice Record      │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Create Line Items           │
│ (Labor, Parts, Fees)        │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Send Notifications          │
│ - Customer: Invoice created │
│ - Finance: Review needed    │
│ - Mechanic: Job invoiced    │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Log Audit Trail             │
│ - Creation event            │
│ - User who created it       │
│ - Timestamp & IP            │
└──────────────────────────────┘
```

### 2.2 Detailed Implementation Steps

#### Step 1: Gather Invoice Data

```typescript
// Service: InvoiceService.ts
interface InvoiceGenerationData {
  jobId: string;
  customerId: string;
  workshopId: string;
  laborHours: Array<{
    mechanicId: string;
    hours: number;
    hourlyRate: number;
  }>;
  parts: Array<{
    partId: string;
    quantity: number;
    unitPrice: number;
  }>;
  diagnosticsFee?: number;
  serviceFee?: number;
  notes?: string;
  dueDate?: Date;
}

async function gatherInvoiceData(jobId: string): Promise<InvoiceGenerationData> {
  // 1. Fetch job details
  const job = await prisma.vehicleJob.findUnique({
    where: { id: jobId },
    include: {
      customer: true,
      laborRecords: true,
      partsUsed: true,
    },
  });

  if (!job) throw new Error('Job not found');

  // 2. Calculate labor costs
  const laborHours = job.laborRecords.map(record => ({
    mechanicId: record.mechanicId,
    hours: record.hours,
    hourlyRate: record.hourlyRate,
  }));

  // 3. Gather parts
  const parts = job.partsUsed.map(part => ({
    partId: part.partId,
    quantity: part.quantity,
    unitPrice: part.unitPrice,
  }));

  // 4. Get diagnostic and service fees
  const workshopSettings = await prisma.workshop.findUnique({
    where: { id: job.workshopId },
  });

  return {
    jobId: job.id,
    customerId: job.customerId,
    workshopId: job.workshopId,
    laborHours,
    parts,
    diagnosticsFee: workshopSettings?.diagnosticsFee || 0,
    serviceFee: workshopSettings?.serviceFee || 0,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  };
}
```

#### Step 2: Calculate Totals

```typescript
interface InvoiceTotals {
  laborTotal: number;
  partsTotal: number;
  feesTotal: number;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
}

async function calculateInvoiceTotals(
  data: InvoiceGenerationData,
  taxRate: number = 0.15 // 15% VAT in South Africa
): Promise<InvoiceTotals> {
  // Labor costs
  const laborTotal = data.laborHours.reduce(
    (sum, labor) => sum + labor.hours * labor.hourlyRate,
    0
  );

  // Parts costs
  const partsTotal = data.parts.reduce(
    (sum, part) => sum + part.quantity * part.unitPrice,
    0
  );

  // Fees
  const feesTotal = (data.diagnosticsFee || 0) + (data.serviceFee || 0);

  // Subtotal (before tax)
  const subtotal = laborTotal + partsTotal + feesTotal;

  // Tax calculation
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100; // 2 decimal places

  // Total
  const totalAmount = subtotal + taxAmount;

  return {
    laborTotal: Math.round(laborTotal * 100) / 100,
    partsTotal: Math.round(partsTotal * 100) / 100,
    feesTotal: Math.round(feesTotal * 100) / 100,
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount,
    totalAmount,
  };
}
```

#### Step 3: Generate Invoice Number

```typescript
async function generateInvoiceNumber(workshopId: string, date: Date): Promise<string> {
  // Format: WS-YYYY-MM-NNNNN
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  
  // Count invoices created this month
  const startOfMonth = new Date(year, date.getMonth(), 1);
  const endOfMonth = new Date(year, date.getMonth() + 1, 0);
  
  const count = await prisma.invoice.count({
    where: {
      workshopId,
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

  const sequence = String(count + 1).padStart(5, '0');
  
  return `${workshopId.substring(0, 2)}-${year}${month}-${sequence}`;
}
```

#### Step 4: Create Invoice Record

```typescript
async function createInvoice(
  userId: string,
  jobId: string,
  data: InvoiceGenerationData,
  totals: InvoiceTotals
): Promise<Invoice> {
  const invoiceNumber = await generateInvoiceNumber(data.workshopId, new Date());

  return await prisma.invoice.create({
    data: {
      invoiceNumber,
      jobId,
      customerId: data.customerId,
      workshopId: data.workshopId,
      
      dueDate: data.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      subtotal: new Decimal(totals.subtotal),
      taxAmount: new Decimal(totals.taxAmount),
      totalAmount: new Decimal(totals.totalAmount),
      paidAmount: new Decimal(0),
      balanceDue: new Decimal(totals.totalAmount),
      
      status: 'DRAFT',
      paymentStatus: 'UNPAID',
      
      createdBy: userId,
      updatedBy: userId,
      
      // Create line items
      lineItems: {
        create: [
          // Labor line items
          ...data.laborHours.map((labor, index) => ({
            description: `Labor - ${labor.hours}h @ $${labor.hourlyRate}/h`,
            quantity: new Decimal(labor.hours),
            unitPrice: new Decimal(labor.hourlyRate),
            lineTotal: new Decimal(labor.hours * labor.hourlyRate),
            itemType: 'LABOR',
            taxable: true,
          })),
          
          // Parts line items
          ...data.parts.map((part) => ({
            description: `Parts - ${part.partId}`,
            quantity: new Decimal(part.quantity),
            unitPrice: new Decimal(part.unitPrice),
            lineTotal: new Decimal(part.quantity * part.unitPrice),
            itemType: 'PARTS',
            partId: part.partId,
            taxable: true,
          })),
          
          // Diagnostics fee
          ...(data.diagnosticsFee ? [{
            description: 'Diagnostics Fee',
            quantity: new Decimal(1),
            unitPrice: new Decimal(data.diagnosticsFee),
            lineTotal: new Decimal(data.diagnosticsFee),
            itemType: 'DIAGNOSTICS',
            taxable: true,
          }] : []),
          
          // Service fee
          ...(data.serviceFee ? [{
            description: 'Service Fee',
            quantity: new Decimal(1),
            unitPrice: new Decimal(data.serviceFee),
            lineTotal: new Decimal(data.serviceFee),
            itemType: 'SERVICE_FEE',
            taxable: true,
          }] : []),
        ],
      },
    },
    include: {
      lineItems: true,
      customer: true,
      job: true,
    },
  });
}
```

#### Step 5: Send Notifications

```typescript
async function sendInvoiceNotifications(
  invoice: Invoice,
  userId: string
): Promise<void> {
  const notificationQueue = getNotificationQueue(); // Bull/RabbitMQ queue

  // 1. Notify customer
  await notificationQueue.add('send-notification', {
    type: 'INVOICE_CREATED',
    userId: invoice.customerId,
    invoiceId: invoice.id,
    templateId: 'invoice-created-customer',
    variables: {
      customerName: invoice.customer.name,
      invoiceNumber: invoice.invoiceNumber,
      totalAmount: invoice.totalAmount.toString(),
      dueDate: invoice.dueDate.toLocaleDateString(),
    },
    channels: ['EMAIL', 'IN_APP'],
  });

  // 2. Notify finance team
  const financeTeam = await prisma.user.findMany({
    where: {
      role: 'FINANCE',
      workshopId: invoice.workshopId,
    },
  });

  for (const financeUser of financeTeam) {
    await notificationQueue.add('send-notification', {
      type: 'INVOICE_CREATED',
      userId: financeUser.id,
      invoiceId: invoice.id,
      templateId: 'invoice-created-finance',
      variables: {
        invoiceNumber: invoice.invoiceNumber,
        customerName: invoice.customer.name,
        totalAmount: invoice.totalAmount.toString(),
      },
      priority: 'HIGH',
    });
  }
}
```

#### Step 6: Log Audit Trail

```typescript
async function logInvoiceCreation(
  invoice: Invoice,
  userId: string,
  ipAddress?: string
): Promise<void> {
  await prisma.auditLog.create({
    data: {
      userId,
      ipAddress,
      action: 'INVOICE_CREATED',
      resource: 'INVOICE',
      resourceId: invoice.id,
      invoiceId: invoice.id,
      jobId: invoice.jobId,
      workshopId: invoice.workshopId,
      changeType: 'CREATE',
      newValues: {
        invoiceNumber: invoice.invoiceNumber,
        totalAmount: invoice.totalAmount.toString(),
        status: invoice.status,
      },
      status: 'SUCCESS',
      description: `Invoice ${invoice.invoiceNumber} created for customer ${invoice.customerId}`,
      isHighRisk: true, // Financial transaction
      dataClassification: 'CONFIDENTIAL',
    },
  });
}
```

### 2.3 Main Invoice Generation Function

```typescript
async function generateInvoice(
  jobId: string,
  userId: string,
  ipAddress?: string
): Promise<Invoice> {
  try {
    // Step 1: Validate job exists and is complete
    const job = await prisma.vehicleJob.findUnique({ where: { id: jobId } });
    if (!job) throw new Error('Job not found');
    if (job.status !== 'COMPLETED') {
      throw new Error('Invoice can only be generated for completed jobs');
    }

    // Step 2: Check if invoice already exists
    const existingInvoice = await prisma.invoice.findFirst({
      where: { jobId },
    });
    if (existingInvoice) {
      throw new Error('Invoice already exists for this job');
    }

    // Step 3: Gather data
    const invoiceData = await gatherInvoiceData(jobId);

    // Step 4: Calculate totals
    const totals = await calculateInvoiceTotals(invoiceData);

    // Step 5: Create invoice (with transaction)
    const invoice = await prisma.$transaction(async (tx) => {
      // Create invoice
      const newInvoice = await createInvoice(userId, jobId, invoiceData, totals);

      // Log creation
      await tx.auditLog.create({
        data: {
          userId,
          ipAddress,
          action: 'INVOICE_CREATED',
          resource: 'INVOICE',
          resourceId: newInvoice.id,
          invoiceId: newInvoice.id,
          jobId: newInvoice.jobId,
          workshopId: newInvoice.workshopId,
          changeType: 'CREATE',
          newValues: {
            invoiceNumber: newInvoice.invoiceNumber,
            totalAmount: newInvoice.totalAmount.toString(),
            dueDate: newInvoice.dueDate.toISOString(),
          },
          status: 'SUCCESS',
          description: `Invoice ${newInvoice.invoiceNumber} created for job ${jobId}`,
          isHighRisk: true,
          dataClassification: 'CONFIDENTIAL',
        },
      });

      return newInvoice;
    });

    // Step 6: Send notifications (outside transaction)
    await sendInvoiceNotifications(invoice, userId);

    return invoice;
  } catch (error) {
    // Log failure
    await prisma.auditLog.create({
      data: {
        userId,
        ipAddress,
        action: 'INVOICE_CREATED',
        resource: 'INVOICE',
        resourceId: jobId,
        changeType: 'CREATE',
        status: 'FAILURE',
        errorMessage: error.message,
        description: `Failed to create invoice for job ${jobId}: ${error.message}`,
      },
    });

    throw error;
  }
}
```

### 2.4 API Endpoint

```typescript
// routes/api/invoices/generate.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/middleware/auth';
import { generateInvoice } from '@/services/invoiceService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { jobId } = req.body;
    const { userId } = req.user; // From auth middleware
    const ipAddress = req.headers['x-forwarded-for'] as string;

    if (!jobId) {
      return res.status(400).json({ error: 'jobId is required' });
    }

    const invoice = await generateInvoice(jobId, userId, ipAddress);

    return res.status(201).json({
      success: true,
      data: invoice,
      message: `Invoice ${invoice.invoiceNumber} generated successfully`,
    });
  } catch (error) {
    console.error('Invoice generation error:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate invoice',
    });
  }
}
```

### 2.5 Frontend Integration (React Example)

```typescript
// hooks/useInvoiceGeneration.ts
import { useState } from 'react';
import { generateInvoice } from '@/api/invoices';

export function useInvoiceGeneration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (jobId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await generateInvoice(jobId);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error };
}
```

---

## PART 3: TESTING & VALIDATION

### 3.1 Unit Tests

```typescript
// __tests__/services/invoiceService.test.ts
describe('Invoice Generation', () => {
  describe('calculateInvoiceTotals', () => {
    it('should calculate correct totals with tax', () => {
      const data = {
        laborHours: [{ hours: 5, hourlyRate: 150 }],
        parts: [{ quantity: 2, unitPrice: 50 }],
        diagnosticsFee: 100,
      };

      const result = calculateInvoiceTotals(data, 0.15);

      expect(result.laborTotal).toBe(750);
      expect(result.partsTotal).toBe(100);
      expect(result.feesTotal).toBe(100);
      expect(result.subtotal).toBe(950);
      expect(result.taxAmount).toBe(142.50);
      expect(result.totalAmount).toBe(1092.50);
    });
  });

  describe('generateInvoiceNumber', () => {
    it('should generate sequential invoice numbers', async () => {
      const workshopId = 'WS-001';
      const date = new Date('2026-06-15');

      const number1 = await generateInvoiceNumber(workshopId, date);
      const number2 = await generateInvoiceNumber(workshopId, date);

      expect(number1).toMatch(/WS-202606-00001/);
      expect(number2).toMatch(/WS-202606-00002/);
    });
  });
});
```

### 3.2 Integration Tests

```typescript
// __tests__/api/invoices/generate.test.ts
describe('POST /api/invoices/generate', () => {
  it('should generate invoice for completed job', async () => {
    const job = await createTestJob({ status: 'COMPLETED' });

    const response = await request(app)
      .post('/api/invoices/generate')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ jobId: job.id })
      .expect(201);

    expect(response.body.data.invoiceNumber).toBeDefined();
    expect(response.body.data.totalAmount).toBeGreaterThan(0);
  });

  it('should reject generation for incomplete job', async () => {
    const job = await createTestJob({ status: 'IN_PROGRESS' });

    const response = await request(app)
      .post('/api/invoices/generate')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ jobId: job.id })
      .expect(400);

    expect(response.body.error).toContain('completed');
  });
});
```

### 3.3 Acceptance Criteria Checklist

- [ ] Invoice generation triggered automatically on job completion
- [ ] Invoice number auto-generated in correct format (WS-YYYY-MM-NNNNN)
- [ ] All line items (labor, parts, fees) included correctly
- [ ] Tax calculated at 15% VAT (South Africa)
- [ ] Invoice status transitions working (DRAFT → ISSUED → etc.)
- [ ] Notifications sent to customer and finance team
- [ ] Audit logs record creation event with user & timestamp
- [ ] Decimal precision maintained (2 decimal places for currency)
- [ ] Customer cannot access others' invoices (security check)
- [ ] Invoice cannot be deleted (audit trail requirement)
- [ ] PDF generation working for invoice download
- [ ] Email template customizable per workshop

---

## PART 4: DEPLOYMENT & ROLLOUT

### Phase 1: Development (Week 1-2)
- Implement schema changes
- Build invoice generation service
- Create unit tests
- Set up test data

### Phase 2: Testing (Week 3)
- Integration testing
- Performance testing (1000+ invoices)
- Security audit
- User acceptance testing with finance team

### Phase 3: Staging (Week 4)
- Deploy to staging environment
- Run smoke tests
- Performance benchmarks
- Security penetration testing

### Phase 4: Production (Week 5)
- Blue-green deployment
- Monitor audit logs
- Support team training
- Customer documentation

---

## PART 5: RESOURCES & REFERENCES

### Database Optimization
- Add indexes on frequently queried fields
- Use database partitioning for audit logs by date
- Archive old invoices to cold storage after 7 years

### Security Considerations
- Encrypt PII in audit logs
- Implement role-based access control (RBAC) for invoice access
- Rate limit invoice generation API (prevent abuse)
- Validate all inputs server-side
- Use prepared statements to prevent SQL injection

### South Africa Compliance
- VAT rates: 15% standard (check for exemptions)
- Invoice retention: 5+ years for tax compliance
- Currency: ZAR (South African Rand)
- Language: English (with optional Afrikaans)

---

**Document Owner:** BlazeDiagnosis Development Team  
**Last Updated:** June 15, 2026  
**Next Review:** July 15, 2026
