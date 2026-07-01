# Feature and Function Backlog

This file tracks the practical implementation work still required after the starter scaffold.

## Tenancy

Required functions:

- `createTenant(input)`
- `updateTenantBranding(tenantId, input)`
- `updateTenantSettings(tenantId, input)`
- `resolveTenantFromHost(host)`
- `resolveTenantFromSession(session)`
- `requireTenantContext()`
- `assertTenantAccess(userId, tenantId)`
- `listTenantFeatureFlags(tenantId)`
- `isFeatureEnabled(tenantId, flagKey)`

## Auth and Authorization

Required functions:

- `signInWithEmail(input)`
- `signOut()`
- `requestPasswordReset(email)`
- `resetPassword(token, password)`
- `verifyEmail(token)`
- `createStaffInvitation(input)`
- `acceptStaffInvitation(token)`
- `createSupplierInvitation(input)`
- `acceptSupplierInvitation(token)`
- `createCustomerAccount(input)`
- `requireUser()`
- `requirePermission(permission)`
- `requireResourceAccess(resourceType, resourceId)`

## Customers

Required functions:

- `createCustomer(tenantId, input)`
- `updateCustomer(tenantId, customerId, input)`
- `archiveCustomer(tenantId, customerId)`
- `getCustomerById(tenantId, customerId)`
- `searchCustomers(tenantId, filters)`
- `getCustomerDashboard(customerId)`
- `getCustomerServiceHistory(customerId)`

## Vehicles

Required functions:

- `createVehicle(tenantId, input)`
- `updateVehicle(tenantId, vehicleId, input)`
- `linkVehicleToCustomer(tenantId, vehicleId, customerId)`
- `recordOdometerReading(tenantId, vehicleId, reading)`
- `getVehicleHistory(tenantId, vehicleId)`
- `getVehicleForCustomer(customerId, vehicleId)`

## Service Requests and Job Cards

Required functions:

- `createServiceRequest(tenantId, input)`
- `convertServiceRequestToJobCard(tenantId, serviceRequestId)`
- `createIntakeInspection(tenantId, input)`
- `assignMechanic(tenantId, jobCardId, mechanicId)`
- `assignFloorManager(tenantId, jobCardId, floorManagerId)`
- `updateJobInternalStatus(tenantId, jobCardId, status)`
- `updateJobCustomerStatus(tenantId, jobCardId, status)`
- `addJobNote(tenantId, jobCardId, input)`
- `addDiagnosticResult(tenantId, jobCardId, input)`
- `addInspectionResult(tenantId, jobCardId, input)`
- `attachJobFile(tenantId, jobCardId, fileId)`
- `getWorkshopBoard(tenantId, filters)`

## Quotes and Approvals

Required functions:

- `createQuoteFromJobCard(tenantId, jobCardId)`
- `addQuoteLineItem(tenantId, quoteId, input)`
- `updateQuoteLineItem(tenantId, quoteLineItemId, input)`
- `sendQuoteToCustomer(tenantId, quoteId)`
- `approveQuoteLineItem(tenantId, quoteLineItemId, customerId)`
- `declineQuoteLineItem(tenantId, quoteLineItemId, customerId, reason)`
- `recalculateQuoteTotals(tenantId, quoteId)`
- `lockApprovedQuote(tenantId, quoteId)`
- `createQuoteRevision(tenantId, quoteId)`
- `getCustomerApprovalView(tenantId, quoteId, customerId)`

## Labor Rules

Required functions:

- `createLaborRule(tenantId, input)`
- `evaluateLaborRule(rule, approvedItems)`
- `calculateApprovedQuoteTotals(quote)`
- `preventDuplicateSharedLabor(items)`
- `snapshotLaborCalculation(tenantId, quoteId, result)`

## Invoices

Required functions:

- `createInvoiceFromApprovedQuote(tenantId, quoteId)`
- `createPartialInvoice(tenantId, quoteId, itemIds)`
- `markInvoiceIssued(tenantId, invoiceId)`
- `markInvoicePaid(tenantId, invoiceId, paymentInput)`
- `voidInvoice(tenantId, invoiceId, reason)`
- `getCustomerInvoices(tenantId, customerId)`
- `getStationInvoices(tenantId, filters)`
- `renderInvoiceDocument(tenantId, invoiceId)`

## Parts and Suppliers

Required functions:

- `createPartsRequest(tenantId, jobCardId, input)`
- `sendPartsRequestToSuppliers(tenantId, partsRequestId, supplierIds)`
- `submitSupplierResponse(supplierId, partsRequestId, input)`
- `compareSupplierResponses(tenantId, partsRequestId)`
- `approveSupplierResponse(tenantId, supplierResponseId)`
- `createPartsOrderFromSupplierResponse(tenantId, supplierResponseId)`
- `updatePartsOrderStatus(tenantId, partsOrderId, status)`
- `updatePartsDeliveryStatus(tenantId, deliveryId, status)`
- `recordProofOfDelivery(tenantId, deliveryId, fileId)`
- `notifyCustomerOfPartsDelay(tenantId, jobCardId)`

## Chat

Required functions:

- `createJobChatThread(tenantId, jobCardId)`
- `createSupplierChatThread(tenantId, partsRequestId)`
- `sendChatMessage(tenantId, threadId, input)`
- `listChatMessages(tenantId, threadId)`
- `markThreadRead(tenantId, threadId, userId)`

## Notifications

Required functions:

- `createInAppNotification(input)`
- `markNotificationRead(notificationId)`
- `listUserNotifications(userId)`
- `dispatchNotification(notificationId)`
- `resolveNotificationPreferences(userId, tenantId, eventType)`
- `queueQuoteApprovalNotification(tenantId, quoteId)`
- `queueInvoiceNotification(tenantId, invoiceId)`
- `queuePartsDelayNotification(tenantId, jobCardId)`

## Audit

Required functions:

- `writeAuditLog(input)`
- `auditQuoteApproval(input)`
- `auditInvoiceChange(input)`
- `auditJobStatusChange(input)`
- `auditTenantSettingChange(input)`
- `searchAuditLogs(tenantId, filters)`

## Reporting

Required functions:

- `getRevenueReport(tenantId, range)`
- `getQuoteApprovalRate(tenantId, range)`
- `getMechanicWorkload(tenantId, range)`
- `getJobTurnaroundReport(tenantId, range)`
- `getSupplierPerformanceReport(tenantId, range)`
- `getOutstandingInvoices(tenantId)`
- `getDelayedJobs(tenantId)`
