const routes = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('pages/index'),
        meta: { title: '主页', requiresAuth: false }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('pages/User'),
        meta: { title: '用户管理', requiresAuth: false }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('pages/Role'),
        meta: { title: '角色管理', requiresAuth: false }
      },
      {
        path: '/productCode',
        name: 'productCode',
        component: () => import('pages/ProductCode'),
        meta: { title: '产品编号管理', requiresAuth: false }
      },
      {
        path: '/productStyle',
        name: 'productStyle',
        component: () => import('pages/ProductStyle'),
        meta: { title: '产品款式管理', requiresAuth: false }
      },
      {
        path: '/productClass',
        name: 'productClass',
        component: () => import('pages/ProductClass'),
        meta: { title: '产品类别管理', requiresAuth: false }
      }
    ]
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    meta: { requiresAuth: false },
    component: () => import('layouts/AuthLayout'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/Login'),
        meta: { requiresAuth: false }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/auth/Register'),
        meta: { requiresAuth: false }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
