**Date:** 2026-06-10
**User:** PJ
**Tag:** #WIL 
**Status:** #ongoing 
**Link:** [[WIL HUB]] | [[WIL Notes]]

---
**What happened today:**

**Task to complete**
- [x] Draft or update the database entity list.
	- The entity list is all the things the system needs to track. Because we are making an app for a mechanic shop, the system must have the following entities:
		- Tenants
		- Branches
		- Users
		- Customers
		- Vehicles
		- Jobs
		- Inspections
		- Quotes
		- Quote Lines
		- Part Requests
		- Invoices
		- Payments
		- Notifications
		- Job Status history
		- Suppliers
		- Supplier Branches
		- Products
		- Inventory Items
		- Supplier Prices
		- Purchase Orders
		- Purchase Order Lines
		- Promotions
	- We need to make sure that the relationships between the entities link correctly. It must look like this:
		- Multi-tenancy & Core Management
			- Tenants to Branches: One-to-Many
			- Branches to Users: One-to-Many
			- Tenants to Customers: One-to-Many
		- Operations & Workshop Flow 
			- Customers to Vehicles: One-to-Many
			- Vehicles to Jobs: One-to-Many
			- Jobs to Inspections: One-to-Many
			- Jobs to Job Status History: One-to-Many
			- Jobs to Part Requests: One-to-Many
		- Financials & Billing
			- Jobs to Quotes: One-to-Many
			- Quotes to Quote Lines: One-to-Many
			- Jobs to Invoices: One-to-many
			- Invoices to Payments: One-to-Many
		- Suppliers & Procurement
			- Suppliers to Supplier Branches: One-to-Many
			- Supplier Branches to Purchase Orders: One-to-Many
			- Purchase Orders to Purchase Order Lines: One-to-Many
		- Catalog, Inventory & Pricing
			- Products to Inventory Items: One-to-Many
			- Products to Supplier Prices: One-to-Many
			- Products to Promotions: Many-to-Many
			- Inventory Items to Quote Lines/PO lines: One-to-Many
- [x] Review existing Prisma schema and note where it differs from the planned backlog.
	1. This is the existing Prisma schema
	generator client {
	  provider = "prisma-client-js"
	}
	
	datasource db {
	  provider = "postgresql"
	  url      = env("DATABASE_URL")
	}
	
	enum UserRole {
	  OWNER
	  ADMIN
	  ADVISOR
	  MECHANIC
	  CASHIER
	  SUPPLIER_ADMIN
	  SUPPLIER_SALES
	  SUPPLIER_WAREHOUSE
	  POS_OPERATOR
	}
	
	enum UserStatus {
	  INVITED
	  ACTIVE
	  SUSPENDED
	}
	
	enum TenantType {
	  SERVICE_STATION
	  SUPPLIER
	}
	
	enum JobStatus {
	  DRAFT
	  AWAITING_INSPECTION
	  QUOTATION_IN_PROGRESS
	  AWAITING_CUSTOMER_APPROVAL
	  APPROVED
	  IN_PROGRESS
	  WAITING_FOR_PARTS
	  PARTS_RECEIVED
	  COMPLETED
	  INVOICED
	  PAID
	  READY_FOR_COLLECTION
	  COLLECTED
	  CLOSED
	  CANCELLED
	}
	
	enum QuoteStatus {
	  DRAFT
	  SENT
	  VIEWED
	  APPROVED
	  REJECTED
	  EXPIRED
	  SUPERSEDED
	}
	
	enum PartStatus {
	  REQUIRED
	  PENDING_APPROVAL
	  READY_TO_ORDER
	  ORDERED
	  SHIPPED
	  RECEIVED
	  INSTALLED
	  RETURNED
	  CANCELLED
	}
	
	enum NotificationChannel {
	  EMAIL
	  SMS
	  WHATSAPP
	  IN_APP
	}
	
	model Tenant {
	  id                           String               @id @default(cuid())
	  name                         String
	  slug                         String               @unique
	  type                         TenantType
	  isActive                     Boolean              @default(true)
	  contactEmail                 String?
	  contactPhone                 String?
	  legalName                    String?
	  registrationNumber           String?
	  defaultBranchId              String?
	  timezone                     String               @default("Africa/Johannesburg")
	  currencyCode                 String               @default("ZAR")
	  countryCode                  String               @default("ZA")
	  taxRatePercent               Decimal              @default(15) @db.Decimal(5,2)
	  dateFormat                   String               @default("YYYY-MM-DD")
	  requirePaymentBeforeCollection Boolean            @default(true)
	  createdAt                    DateTime             @default(now())
	  updatedAt                    DateTime             @updatedAt
	  branches                     Branch[]
	  users                        User[]
	  customers                    Customer[]
	  vehicles                     Vehicle[]
	  jobs                         Job[]
	  authSessions                 AuthSession[]
	  passwordResetTokens          PasswordResetToken[]
	}
	
	model Branch {
	  id        String   @id @default(cuid())
	  tenantId  String
	  name      String
	  city      String?
	  address   String?
	  createdAt DateTime @default(now())
	  updatedAt DateTime @updatedAt
	  tenant    Tenant   @relation(fields: [tenantId], references: [id])
	  users     User[]
	}
	
	model User {
	  id                  String               @id @default(cuid())
	  tenantId            String
	  branchId            String?
	  fullName            String
	  firstName           String
	  lastName            String
	  email               String               @unique
	  phone               String?
	  title               String?
	  passwordHash        String
	  role                UserRole
	  status              UserStatus           @default(ACTIVE)
	  isActive            Boolean              @default(true)
	  inviteAcceptedAt    DateTime?
	  lastLoginAt         DateTime?
	  locale              String?
	  timezone            String?
	  defaultBranchId     String?
	  createdAt           DateTime             @default(now())
	  updatedAt           DateTime             @updatedAt
	  tenant              Tenant               @relation(fields: [tenantId], references: [id])
	  branch              Branch?              @relation(fields: [branchId], references: [id])
	  authSessions        AuthSession[]
	  passwordResetTokens PasswordResetToken[]
	}
	
	model Customer {
	  id                            String    @id @default(cuid())
	  tenantId                      String
	  fullName                      String
	  mobileNumber                  String
	  alternateNumber               String?
	  email                         String?
	  address                       String?
	  companyName                   String?
	  taxNumber                     String?
	  preferredCommunicationChannel String?
	  marketingConsent              Boolean   @default(false)
	  createdAt                     DateTime  @default(now())
	  updatedAt                     DateTime  @updatedAt
	  tenant                        Tenant    @relation(fields: [tenantId], references: [id])
	  vehicles                      Vehicle[]
	  jobs                          Job[]
	}
	
	model Vehicle {
	  id                 String    @id @default(cuid())
	  tenantId           String
	  customerId         String
	  registrationNumber String
	  vin                String?
	  make               String
	  model              String
	  variant            String?
	  year               Int?
	  engineType         String?
	  fuelType           String?
	  transmission       String?
	  odometer           Int?
	  color              String?
	  createdAt          DateTime  @default(now())
	  updatedAt          DateTime  @updatedAt
	  tenant             Tenant    @relation(fields: [tenantId], references: [id])
	  customer           Customer  @relation(fields: [customerId], references: [id])
	  jobs               Job[]
	}
	
	model Job {
	  id                    String            @id @default(cuid())
	  tenantId              String
	  customerId            String
	  vehicleId             String
	  assignedMechanicId    String?
	  referenceNumber       String            @unique
	  status                JobStatus
	  customerComplaint     String
	  diagnosisSummary      String?
	  estimatedCompletionAt DateTime?
	  createdAt             DateTime          @default(now())
	  updatedAt             DateTime          @updatedAt
	  tenant                Tenant            @relation(fields: [tenantId], references: [id])
	  customer              Customer          @relation(fields: [customerId], references: [id])
	  vehicle               Vehicle           @relation(fields: [vehicleId], references: [id])
	  inspections           Inspection[]
	  quotes                Quote[]
	  partRequests          PartRequest[]
	  invoices              Invoice[]
	  notifications         Notification[]
	  statusHistory         JobStatusHistory[]
	}
	
	model Inspection {
	  id                String   @id @default(cuid())
	  tenantId          String
	  jobId             String
	  summary           String
	  severity          String?
	  isCustomerVisible Boolean  @default(false)
	  createdByUserId   String?
	  createdAt         DateTime @default(now())
	  updatedAt         DateTime @updatedAt
	  job               Job      @relation(fields: [jobId], references: [id])
	}
	
	model Quote {
	  id             String      @id @default(cuid())
	  tenantId       String
	  jobId          String
	  version        Int
	  status         QuoteStatus
	  subtotal       Decimal     @db.Decimal(10,2)
	  taxAmount      Decimal     @db.Decimal(10,2)
	  discountAmount Decimal     @db.Decimal(10,2)
	  total          Decimal     @db.Decimal(10,2)
	  publicToken    String?     @unique
	  approvedAt     DateTime?
	  rejectedAt     DateTime?
	  createdAt      DateTime    @default(now())
	  updatedAt      DateTime    @updatedAt
	  job            Job         @relation(fields: [jobId], references: [id])
	  lines          QuoteLine[]
	}
	
	model QuoteLine {
	  id          String   @id @default(cuid())
	  quoteId     String
	  type        String
	  description String
	  quantity    Decimal  @db.Decimal(10,2)
	  unitPrice   Decimal  @db.Decimal(10,2)
	  total       Decimal  @db.Decimal(10,2)
	  quote       Quote    @relation(fields: [quoteId], references: [id])
	}
	
	model PartRequest {
	  id                String     @id @default(cuid())
	  tenantId          String
	  jobId             String
	  description       String
	  quantity          Int
	  costPrice         Decimal?   @db.Decimal(10,2)
	  sellPrice         Decimal?   @db.Decimal(10,2)
	  supplierReference String?
	  etaDate           DateTime?
	  status            PartStatus
	  createdAt         DateTime   @default(now())
	  updatedAt         DateTime   @updatedAt
	  job               Job        @relation(fields: [jobId], references: [id])
	}
	
	model Invoice {
	  id             String     @id @default(cuid())
	  tenantId       String
	  jobId          String
	  invoiceNumber  String     @unique
	  subtotal       Decimal    @db.Decimal(10,2)
	  taxAmount      Decimal    @db.Decimal(10,2)
	  total          Decimal    @db.Decimal(10,2)
	  balanceDue     Decimal    @db.Decimal(10,2)
	  status         String
	  createdAt      DateTime   @default(now())
	  updatedAt      DateTime   @updatedAt
	  job            Job        @relation(fields: [jobId], references: [id])
	  payments       Payment[]
	}
	
	model Payment {
	  id            String   @id @default(cuid())
	  tenantId      String
	  invoiceId     String
	  amount        Decimal  @db.Decimal(10,2)
	  paymentMethod String
	  paidAt        DateTime @default(now())
	  createdAt     DateTime @default(now())
	  updatedAt     DateTime @updatedAt
	  invoice       Invoice  @relation(fields: [invoiceId], references: [id])
	}
	
	model Notification {
	  id         String              @id @default(cuid())
	  tenantId   String
	  jobId      String
	  channel    NotificationChannel
	  eventType  String
	  status     String
	  payload    Json?
	  createdAt  DateTime            @default(now())
	  updatedAt  DateTime            @updatedAt
	  job        Job                 @relation(fields: [jobId], references: [id])
	}
	
	model JobStatusHistory {
	  id              String   @id @default(cuid())
	  jobId           String
	  fromStatus      String?
	  toStatus        String
	  changedByUserId String
	  createdAt       DateTime @default(now())
	  job             Job      @relation(fields: [jobId], references: [id])
	}
	
	model AuthSession {
	  id           String   @id @default(cuid())
	  userId       String
	  tenantId     String
	  refreshToken String   @unique
	  createdAt    DateTime @default(now())
	  expiresAt    DateTime
	  revokedAt    DateTime?
	  user         User     @relation(fields: [userId], references: [id])
	  tenant       Tenant   @relation(fields: [tenantId], references: [id])
	}
	
	model PasswordResetToken {
	  id        String   @id @default(cuid())
	  userId    String
	  tenantId  String
	  token     String   @unique
	  createdAt DateTime @default(now())
	  expiresAt DateTime
	  usedAt    DateTime?
	  user      User     @relation(fields: [userId], references: [id])
	  tenant    Tenant   @relation(fields: [tenantId], references: [id])
	}
	
	2. This is what the planned Prisma schema will look like:
	datasource db {
	  provider = "postgresql"
	  url      = env("DATABASE_URL")
	}
	
	generator client {
	  provider = "prisma-client-js"
	}
	
	// ==========================================
	// Multi-tenancy & Core Management
	// ==========================================
	
	model Tenant {
	  id        Int        @id @default(autoincrement())
	  name      String
	  branches  Branch[]
	  customers Customer[]
	}
	
	model Branch {
	  id             Int             @id @default(autoincrement())
	  name           String
	  tenantId       Int
	  tenant         Tenant          @relation(fields: [tenantId], references: [id])
	  users          User[]
	  purchaseOrders PurchaseOrder[]
	}
	
	model User {
	  id       Int    @id @default(autoincrement())
	  email    String @unique
	  name     String
	  branchId Int
	  branch   Branch @relation(fields: [branchId], references: [id])
	}
	
	model Customer {
	  id       Int       @id @default(autoincrement())
	  name     String
	  email    String
	  tenantId Int
	  tenant   Tenant    @relation(fields: [tenantId], references: [id])
	  vehicles Vehicle[]
	}
	
	// ==========================================
	// Operations & Workshop Flow
	// ==========================================
	
	model Vehicle {
	  id         Int      @id @default(autoincrement())
	  vin        String   @unique
	  make       String
	  model      String
	  customerId Int
	  customer   Customer @relation(fields: [customerId], references: [id])
	  jobs       Job[]
	}
	
	model Job {
	  id           Int                @id @default(autoincrement())
	  description  String
	  vehicleId    Int
	  vehicle      Vehicle            @relation(fields: [vehicleId], references: [id])
	  inspections  Inspection[]
	  statusHistory JobStatusHistory[]
	  partRequests PartRequest[]
	  quotes       Quote[]
	  invoices     Invoice[]
	}
	
	model Inspection {
	  id      Int    @id @default(autoincrement())
	  notes   String
	  jobId   Int
	  job     Job    @relation(fields: [jobId], references: [id])
	}
	
	model JobStatusHistory {
	  id        Int      @id @default(autoincrement())
	  status    String
	  changedAt DateTime @default(now())
	  jobId     Int
	  job       Job      @relation(fields: [jobId], references: [id])
	}
	
	model PartRequest {
	  id        Int    @id @default(autoincrement())
	  partName  String
	  quantity  Int
	  jobId     Int
	  job       Job    @relation(fields: [jobId], references: [id])
	}
	
	// ==========================================
	// Financials & Billing
	// ==========================================
	
	model Quote {
	  id         Int         @id @default(autoincrement())
	  totalPrice Decimal     @db.Decimal(10, 2)
	  jobId      Int
	  job        Job         @relation(fields: [jobId], references: [id])
	  quoteLines QuoteLine[]
	}
	
	model QuoteLine {
	  id              Int           @id @default(autoincrement())
	  price           Decimal       @db.Decimal(10, 2)
	  quoteId         Int
	  quote           Quote         @relation(fields: [quoteId], references: [id])
	  inventoryItemId Int
	  inventoryItem   InventoryItem @relation(fields: [inventoryItemId], references: [id])
	}
	
	model Invoice {
	  id       Int       @id @default(autoincrement())
	  amount   Decimal   @db.Decimal(10, 2)
	  jobId    Int
	  job      Job       @relation(fields: [jobId], references: [id])
	  payments Payment[]
	}
	
	model Payment {
	  id        Int      @id @default(autoincrement())
	  amount    Decimal  @db.Decimal(10, 2)
	  invoiceId Int
	  invoice   Invoice  @relation(fields: [invoiceId], references: [id])
	}
	
	// ==========================================
	// Suppliers & Procurement
	// ==========================================
	
	model Supplier {
	  id       Int              @id @default(autoincrement())
	  name     String
	  branches SupplierBranch[]
	}
	
	model SupplierBranch {
	  id             Int             @id @default(autoincrement())
	  location       String
	  supplierId     Int
	  supplier       Supplier        @relation(fields: [supplierId], references: [id])
	  purchaseOrders PurchaseOrder[]
	}
	
	model PurchaseOrder {
	  id               Int                 @id @default(autoincrement())
	  branchId         Int
	  branch           Branch              @relation(fields: [branchId], references: [id])
	  supplierBranchId Int
	  supplierBranch   SupplierBranch      @relation(fields: [supplierBranchId], references: [id])
	  lines            PurchaseOrderLine[]
	}
	
	model PurchaseOrderLine {
	  id              Int           @id @default(autoincrement())
	  quantity        Int
	  purchaseOrderId Int
	  purchaseOrder   PurchaseOrder @relation(fields: [purchaseOrderId], references: [id])
	  inventoryItemId Int
	  inventoryItem   InventoryItem @relation(fields: [inventoryItemId], references: [id])
	}
	
	// ==========================================
	// Catalog, Inventory & Pricing
	// ==========================================
	
	model Product {
	  id             Int                   @id @default(autoincrement())
	  sku            String                @unique
	  name           String
	  inventoryItems InventoryItem[]
	  supplierPrices SupplierPrice[]
	  promotions     PromotionsOnProducts[]
	}
	
	model InventoryItem {
	  id                Int                 @id @default(autoincrement())
	  serialNumber      String?
	  productId         Int
	  product           Product             @relation(fields: [productId], references: [id])
	  quoteLines        QuoteLine[]
	  purchaseOrderLines PurchaseOrderLine[]
	}
	
	model SupplierPrice {
	  id        Int     @id @default(autoincrement())
	  price     Decimal @db.Decimal(10, 2)
	  productId Int
	  product   Product @relation(fields: [productId], references: [id])
	}
	
	model Promotion {
	  id       Int                    @id @default(autoincrement())
	  code     String                 @unique
	  products PromotionsOnProducts[]
	}
	
	// Explicit Join Table for Product <-> Promotion Many-to-Many
	model PromotionsOnProducts {
	  productId   Int
	  promotionId Int
	  product     Product   @relation(fields: [productId], references: [id])
	  promotion   Promotion @relation(fields: [promotionId], references: [id])
	
	  @@id([productId, promotionId])
	}
	
	// ==========================================
	// Global Systems
	// ==========================================
	
	model Notification {
	  id      Int    @id @default(autoincrement())
	  message String
	}
- [x] Draft job card data requirements.
	1. System & Structural Fields: It routes the job card to the correct multi-tenant location
		- id
		- job_card_number
		- tenant_id
		- branch_id
	2. Relational Fields
		- customer_id
		- vehicle_id
		- assigned_technician_id
		- created_by_id
	3. Operational & Diagnostics data
		- status
		- odometer_reading
		- fuel_level
		- customer_compliant
		- advisor_notes
	4. Scheduling & Financial Metadata
		- promsied_date
		- created_at
		- updated_at
- [x] Draft customer and vehicle relationship requirements.
	1. The Relationship Cardinality
		- One-to-Many Relationship: A single Customer can own and register multiple Vehicles.
		- Single Active Ownership: A specific Vehicle record must be mapped to a singular Customer ID.
	2. Customer Profile Data Fields 
		- id
		- tenant_id
		- customer_type
		- first_name / last_name (full_name)
		- company_name
		- phone_number
		- email
	3. Vehicle Profile Data Fields
		- id
		- customer_id
		- vin
		- license_plate
		- make
		- model
		- year
- [x] Start planning a small CRUD feature.
	1. API Route Definitions
		- Create (POST /api/vehicles): This will register a new vehicle
			- Payload: {customer_id, vin, license_plate, make, model, year }
			- Validation: Check if VIN already exists; verify customer_id belongs to the current tenant_id.
		- Read (GET /api/vehicles/:id) or (GET /api/vehicles): Retrieves a single vehicle profile or lists all vehicles filtered by the authenticated user's branch_id.
		- Update (PATCH / api/vehicles/:id): Modify the vehicle's metadata such as the license_plate.
		- Delete (DELETE /api/vehicles/:id): Delete a vehicle record.
- [x] Review quote approval workflow.
	1. Workflow State Rules
		- Starting State: DRAFT (Sets when a service advisor creates a quote from a vehicle inspection.)
		- The Review Trigger: Moving to AWAITING_APPROVAL. The backend locks editing on Quote Lines to prevent price manipulation while the customer evaluates it.
		- Terminal States:
			- APPROVED: Triggered only by a client confirmation token or internal manager override.
			- REJECTED: Moves back to DRAFT for adjustments if the customer declines specific line items.
	2. Automated Side-Effects
		- Upon hitting AWAITING_APPROVAL, the Notification engine auto-dispatches a SMS or Email link containing a digital approval form to the Customer.
		- Upon hitting APPROVED, the system checks Inventory Items. If stock levels drop below the needed quantity, it auto-generates a Part Request to protect the job timeline.
- [x] Review job status workflow.
	1. Workflow State Rules
		- Sequence Enforcement: A job card cannot jump directly from DRAFT to COMPLETED. It must follow the verified lifecycle paths mapped out in your diagram. Something like Draft => In Progress => Quality Check => Completed.
		- The Blocking Guard: Moving from Draft to In Progress is programmatically blocked unless the linked quote is marked APPROVED. This prevents technicians from working on unapproved billable hours.
	 2. Audit Logging (Job Status History)
		 - Every change in status must call a database transaction that updates the main Job row and appends a row to the Job Status History table tracking:
		 - previous_status, new_status, changed_by_user_id, and a timestamp.
