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
  }

]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'el-icon-pie-chart', roles: ['root', 'teacher', 'student'] }
      }
    ]
  },
  {
    path: '/lesson_plan',
    component: Layout,
    children: [{
      path: '',
      name: 'lessonPlan',
      component: () => import('@/views/lesson_plan/index'),
      meta: { title: '教案管理', icon: 'el-icon-s-order', roles: ['root', 'teacher'] }
    }]
  },
  {
    path: '/t_task',
    component: Layout,
    children: [{
      path: '/t_task',
      name: 'TTask',
      component: () => import('@/views/teacher_task/index'),
      meta: { title: '课程管理', icon: 'el-icon-s-platform', roles: ['root', 'teacher'] }
    }]
  },
  {
    path: '/student_work',
    component: Layout,
    children: [{
      path: '/student_work',
      name: 'CourseWork',
      component: () => import('@/views/teacher_student_coursework_list/index'),
      meta: { title: '学生作业', icon: 'el-icon-notebook-1', roles: ['root', 'teacher'] }
    }]
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
      meta: { title: '评价', icon: 'el-icon-rank', roles: ['student', 'teacher', 'root'] }
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
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-user', roles: ['root'] }
      }, {
        path: 'students',
        name: 'StudentInfo',
        component: () => import('@/views/student_info/index'),
        meta: { title: '学生信息', icon: 'el-icon-crop', roles: ['root'] }
      },
      {
        path: '/teacher',
        name: 'TeacherInfo',
        component: () => import('@/views/teacher_info/index'),
        meta: { title: '教师信息', icon: 'el-icon-crop', roles: ['root'] }
      }
    ]
  },
  {
    path: '/article/:courseid/:workid',
    hidden: true,
    component: Layout,
    children: [{
      path: '',
      name: 'Course',
      component: () => import('@/views/course_info/index'),
      meta: { title: '课程', icon: 'el-icon-c-scale-to-original', roles: ['root', 'student', 'teacher'] }
    }]
  },

  {
    path: '/dic',
    component: Layout,
    meta: { title: '典表', icon: 'el-icon-user', roles: ['root'] },
    children: [
      {
        path: 'sport',
        name: 'sport',
        component: () => import('@/views/dic/sport/index'),
        meta: { title: '运动类别', icon: 'el-icon-user', roles: ['root'] }
      }
      // {
      //   path: 'xxx',
      //   name: 'sport',
      //   component: () => import('@/views/dic/sport/index'),
      //   meta: { title: '运动类别', icon: 'el-icon-user', roles: [] }
      // }
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
        meta: { title: 'Profile', icon: 'user', noCache: true, roles: ['root', 'student', 'teacher'] }
      }
    ]
  },
  // {
  //   path: '/upload',
  //   component: Layout,
  //   children: [{
  //     path: '/upload',
  //     name: 'Upload',
  //     component: () => import('@/views/upload/index'),
  //     meta: { title: '对象存储', icon: 'dashboard', roles: ['root'] }
  //   }]
  // },
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
