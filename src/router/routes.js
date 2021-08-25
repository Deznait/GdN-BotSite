
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Homepage',
        component: () => import('pages/Index.vue')
      },
      {
        path: "miembros",
        name: 'Miembros',
        component: () => import("pages/Members.vue")
      },
      {
        path: "puntos",
        name: 'Puntos',
        component: () => import("pages/Puntos.vue")
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
