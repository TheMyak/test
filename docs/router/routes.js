
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/Login.vue'),
    meta: { auth: false }
  },
  {
    path: '/inicio',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'typography', name: 'typography', component: () => import('pages/Typography.vue') },
      { path: 'flex', name: 'flex', component: () => import('pages/Flex.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
