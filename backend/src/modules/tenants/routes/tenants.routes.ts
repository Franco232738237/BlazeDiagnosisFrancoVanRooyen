export const tenantsRoutes = [
  { method: 'GET', path: '/api/tenants', requiredPermission: 'tenant.read' },
  { method: 'GET', path: '/api/tenants/:id', requiredPermission: 'tenant.read' },
  { method: 'POST', path: '/api/tenants', requiredPermission: 'tenant.create' },
  { method: 'PATCH', path: '/api/tenants/:id', requiredPermission: 'tenant.update' },
];
