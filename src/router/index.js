import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
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
    path: '/success',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/success')
      }
    ],
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
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'el-icon-pie-chart', roles: [] }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true, roles: [] }
      }
    ]
  }
]

export const asyncRoutes = [

  {
    path: '/fill_apply',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'TTask',
      component: () => import('@/views/fill_apply/index'),
      meta: { title: '申请填报', icon: 'el-icon-s-platform', roles: ['root', 'club'] }
    }]
  },
  {
    path: '/application_review',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ApplicationReview',
        component: () => import('@/views/application_review/index'),
        meta: { title: '申请审批', icon: 'el-icon-notebook-1', roles: ['root', 'teacher', 'student', 'sport'] }
      },
      {
        path: 'detail',
        hidden: true,
        name: 'ApplicationReviewDetail',
        component: () => import('@/views/application_review/detail'),
        meta: { title: '申请审批', icon: 'el-icon-notebook-1', roles: ['root', 'teacher', 'student', 'sport'] }
      }
    ]
  },
  {
    path: '/apply_template_config',
    component: Layout,
    children: [{
      path: '',
      name: 'ApplyTemplate',
      component: () => import('@/views/apply_template_config/index'),
      meta: { title: '申报模板配置', icon: 'el-icon-s-order', roles: ['root', 'student'] }
    }]
  },
  {
    path: '/userinfo',
    component: Layout,
    meta: { title: '用户信息', icon: 'el-icon-crop', roles: ['root'] },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/dic/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-user', roles: ['root'] }
      }, {
        path: 'club',
        name: 'ClubInfo',
        component: () => import('@/views/dic/club_info/index'),
        meta: { title: '俱乐部信息', icon: 'el-icon-crop', roles: ['root'] }
      }
    ]
  },
  {
    path: '/dic',
    component: Layout,
    meta: { title: '典表', icon: 'el-icon-notebook-2', roles: ['root'] },
    children: [
      {
        path: 'first',
        name: 'first',
        component: () => import('@/views/dic/sport/index'),
        meta: { title: '一级指标', icon: 'el-icon-data-line', roles: ['root'] }
      },
      {
        path: 'second',
        name: 'second',
        component: () => import('@/views/dic/sport/index'),
        meta: { title: '二级指标', icon: 'el-icon-data-board', roles: ['root'] }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    children: [{
      path: 'center',
      name: 'CourseCenter',
      component: () => import('@/views/course_center/index'),
      meta: { title: '课程中心', icon: 'el-icon-s-goods', roles: ['student'] }
    }]
  },
  {
    path: '/my_course_work',
    component: Layout,
    children: [{
      path: '/my_course_work',
      name: 'MyCourseWork',
      component: () => import('@/views/student_coursework_list/index'),
      meta: { title: '我的作业', icon: 'el-icon-s-opportunity', roles: ['student'] }
    }]
  },
  {
    path: '/invitate_list',
    component: Layout,
    children: [{
      path: '/invitate_list',
      name: 'InvitateList',
      component: () => import('@/views/invitate_list/index'),
      meta: { title: '评级列表', icon: 'el-icon-s-data', roles: ['sport', 'teacher', 'root'] }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
