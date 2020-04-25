export default [
  {
    path: '/admin/business',
    name: 'admin-business',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-business" */ '@/components/AdminBusinesses.vue'
      )
  },
  {
    path: '/admin/cities',
    name: 'admin-cities',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-cities" */
        '@/components/AdminCities.vue'
      )
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */ '@/components/AdminUsers.vue'
      )
  },
  {
    path: '/admin/tasks',
    name: 'admin-tasks',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-tasks" */
        '@/components/AdminTasks.vue'
      )
  },
  {
    path: '/admin/sites',
    name: 'admin-sites',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-sites" */ '@/components/AdminSites.vue'
      )
  },
  {
    path: '/admin/assignments',
    name: 'admin-assignments',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-assignments" */
        '@/components/AdminAssignments.vue'
      )
  },
  {
    path: '/admin/equipment',
    name: 'admin-equipment',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-assignments" */
        '@/components/AdminEquipment.vue'
      )
  }
]
