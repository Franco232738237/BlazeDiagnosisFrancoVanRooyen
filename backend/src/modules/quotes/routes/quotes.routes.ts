export const quotesRoutes = [
  { method: 'GET', path: '/api/quotes?jobId=:jobId' },
  { method: 'POST', path: '/api/quotes' },
  { method: 'POST', path: '/api/quotes/:id/send' },
  { method: 'GET', path: '/api/public/quotes/:token' },
  { method: 'POST', path: '/api/public/quotes/:token/approve' },
  { method: 'POST', path: '/api/public/quotes/:token/reject' },
];
