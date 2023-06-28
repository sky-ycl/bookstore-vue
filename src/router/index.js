import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu1 only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu1
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu1
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/books',
    component: Layout,
    redirect: '/books/list',
    name: 'books',
    meta: { title: '朵云书籍', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/books/list.vue'),
        meta: { title: '书籍列表', icon: 'table' }
      },
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/books/manage.vue'),
        meta: { title: '书籍管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/friends',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/friends/index.vue'),
        meta: { title: '朵云圈', icon: 'el-icon-s-help' }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/permission/index.vue'),
        meta: { title: '权限管理', icon: 'link' }
      }
    ]
  },

  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/menu1',
    name: 'settings',
    meta: {
      title: '设置',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: () => import('@/views/settings/menu1/index.vue'), // Parent router-view
        meta: { title: '设置1' }
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/settings/menu2/index.vue'),
        meta: { title: '设置2' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
