
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
          path: '',
          name: 'Dashboard',
      component: () => import('pages/Index.vue')
    },
      {
          path: "miembros",
          name: 'Miembros',
      component: () => import("src/pages/Members.vue")
    },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
