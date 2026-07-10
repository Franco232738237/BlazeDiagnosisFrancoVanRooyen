export const jobsRoutes = [

  {

    method: 'GET',

    path: '/api/jobs'

  },

  {

    method: 'POST',

    path: '/api/jobs'

  },

  {

    method: 'GET',

    path: '/api/jobs/:id'

  },

  {

    method: 'PATCH',

    path: '/api/jobs/:id/status'

  },
  {
    method:'GET',
    path:'/api/jobs/:id/timeline'
}

];
