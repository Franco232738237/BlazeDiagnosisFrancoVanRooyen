export const authRoutes = [
  { method: 'POST', path: '/api/auth/login' },
  { method: 'GET', path: '/api/auth/me' },
  { method: 'POST', path: '/api/auth/refresh' },
  { method: 'POST', path: '/api/auth/logout' },
  { method: 'POST', path: '/api/auth/forgot-password' },
  { method: 'POST', path: '/api/auth/reset-password' },
];
