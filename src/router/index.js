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
    hidden: true,
    component: () => import('@/views/login/index')
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
      meta: { title: '首页', icon: '首页', affix: true }
    }]
  },

  {
    path: '/books',
    component: Layout,
    redirect: '/books/list',
    name: 'books',
    meta: { title: '朵云书籍', icon: '书籍' },
    children: [
      {
        path: 'list',
        name: 'bookList',
        component: () => import('@/views/books/list.vue'),
        meta: { title: '书籍列表', icon: '书籍' }
      },
      {
        path: 'manage',
        name: 'bookManage',
        component: () => import('@/views/books/manage.vue'),
        meta: { title: '我的书籍', icon: '书籍' }
      }
    ]
  },

  {
    path: '/shop',
    component: Layout,
    children: [
      {
        path: 'shopCart',
        name: 'shopCart',
        component: () => import('@/views/shop/shopCart.vue'),
        meta: { title: '购物车', icon: '购物车' }
      }
    ]
  },

  {
    path: '/coupon',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Coupon',
        component: () => import('@/views/coupon/coupon.vue'),
        meta: { title: '优惠卷', icon: '优惠卷' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Order',
        component: () => import('@/views/order/order.vue'),
        meta: { title: '订单', icon: '订单' }
      }
    ]
  },
  {
    path: '/friends',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Friends',
        component: () => import('@/views/friends/index.vue'),
        meta: { title: '朵云圈', icon: '朋友圈' }
      }
    ]
  },

  {
    path: '/payment',
    component: Layout,
    children: [
      {
        path: 'record',
        name: 'record',
        component: () => import('@/views/payment/record.vue'),
        meta: { title: '支付记录', icon: '支付记录' }
      }
    ]
  },
  {
    path: '/me',
    component: Layout,
    redirect: '/me/record',
    name: 'me',
    meta: { title: '我的朵云', icon: '我的' },
    children: [
      {
        path: 'balance',
        name: 'Balance',
        component: () => import('@/views/me/balance.vue'),
        meta: { title: '我的余额', icon: '余额' }
      },
      {
        path: 'record',
        name: 'Record',
        component: () => import('@/views/me/record.vue'),
        meta: { title: '充值记录', icon: '充值记录' }
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
      icon: '设置'
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
