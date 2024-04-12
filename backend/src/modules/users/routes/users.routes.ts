export const usersRoutes = [
  { method: 'GET', path: '/api/users', requiredPermission: 'user.read' },
  { method: 'GET', path: '/api/users/:id', requiredPermission: 'user.read' },
  { method: 'POST', path: '/api/users', requiredPermission: 'user.create' },
  { method: 'PATCH', path: '/api/users/:id', requiredPermission: 'user.update' },
];
