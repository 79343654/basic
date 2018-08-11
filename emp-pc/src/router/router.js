import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/home',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home',
          title: {i18n: 'home'},
          name: 'home_index',
          component: resolve => { require(['@/views/home/home.vue'], resolve); }
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/online-watch',
        name: 'online-watch',
        title: '在线监控',
        icon: 'ios-paper-outline',
        component: Main,
        children: [
            {
                path: 'online-data-1',
                name: 'online-data-1',
                icon: 'ios-paper-outline',
                title: '实时数据',
                component: resolve => { require(['@/views/group/online/online-data.vue'], resolve); }
            },
            {
                path: 'chart',
                name: 'chart',
                icon: 'ios-paper-outline',
                title: '曲线图表',
                component: resolve => { require(['@/views/group/online/chart.vue'], resolve); }
            }
        ]
    },
  {
    path: '/data-center',
    name: 'data-center',
    title: '数据中心',
    icon: 'ios-paper-outline',
    component: Main,
    children: [
      {
        path: 'online-data',
        name: 'online-data',
        icon: 'ios-paper-outline',
        title: '实时数据',
        component: resolve => { require(['@/views/group/online/online-data.vue'], resolve); }
      },
      { path: 'history-data-1',
        title: '历史数据',
        icon: 'ios-paper-outline',
        name: 'history-data-1',
        component: resolve => { require(['@/views/group/data-info/history-data.vue'], resolve); }
      },
      { path: 'recorde',
        title: '预警记录',
        icon: 'ios-paper-outline',
        name: 'recorde',
        component: resolve => { require(['@/views/group/data-info/recorde.vue'], resolve); }
      }
    ]
  },
    {
      path: '/customer',
      name: 'customer',
      title: '客户管理',
      icon: 'ios-paper-outline',
      component: Main,
      children: [
        {
          path: 'customer-data',
          name: 'customer-data',
          icon: 'ios-paper-outline',
          title: '客户管理',
          redirect:"customer-data/customer-data-index",
          component: resolve => { require(['@/views/group/customer-management/customer-index.vue'], resolve); },
          children:[
            {
              path: 'customer-data-index',
              name: 'customer-data-index',
              icon: 'ios-paper-outline',
              title: '客户管理',
              component: resolve => { require(['@/views/group/customer-management/customer.vue'], resolve); }
            },
            { path: 'user-info-management',
              title: '个人信息',
              icon: 'ios-paper-outline',
              name: 'user-info-management',
              component: resolve => { require(['@/views/group/user-management/user-info.vue'], resolve); }
            },
            { path: 'add-new-service-management',
              title: '增值服务',
              icon: 'ios-paper-outline',
              name: 'add-new-service-management',
              component: resolve => { require(['@/views/group/user-management/add-new-service.vue'], resolve); }
            },
          ]
        }
      ]
    },
    {
        path: '/data-info',
        title: '数据信息',
        name: 'data-info',
        icon: 'ios-paper-outline',
        component: Main,
        children: [
            { path: 'history-data',
              title: '历史数据',
              icon: 'ios-paper-outline',
              name: 'history-data',
              component: resolve => { require(['@/views/group/data-info/history-data.vue'], resolve); }
            },
              { path: 'recorde-1',
                title: '预警记录',
                icon: 'ios-paper-outline',
                name: 'recorde-1',
                component: resolve => { require(['@/views/group/data-info/recorde.vue'], resolve); }
              }
        ]
    },
    {
      path: '/device-management-1',
      title: '设备管理',
      name: 'device-management-1',
      icon: 'ios-paper-outline',
      component: Main,
      children: [
        { path: 'share-to-me-1',
          title: '分享给我的设备',
          icon: 'ios-paper-outline',
          name: 'share-to-me-1',
          component: resolve => { require(['@/views/group/device/share-to-me.vue'], resolve); }
        }
      ]
    },
      {
        path: '/device-management',
        title: '设备管理',
        name: 'device-management',
        icon: 'ios-paper-outline',
        component: Main,
        children: [
          { path: 'device-add',
            title: '设备添加分享',
            icon: 'ios-paper-outline',
            name: 'device-add',
            component: resolve => { require(['@/views/group/device/device-add.vue'], resolve); }
          },
          { path: 'device-share',
            title: '我分享的设备',
            icon: 'ios-paper-outline',
            name: 'device-share',
            component: resolve => { require(['@/views/group/device/device-share.vue'], resolve); }
          },
          { path: 'share-to-me',
            title: '分享给我的设备',
            icon: 'ios-paper-outline',
            name: 'share-to-me',
            component: resolve => { require(['@/views/group/device/share-to-me.vue'], resolve); }
          }
        ]
      },
    {
      path: '/user-management-child',
      title: '用户管理',
      name: 'user-management-child',
      icon: 'ios-paper-outline',
      component: Main,
      children: [
        { path: 'user-info',
          title: '个人信息',
          icon: 'ios-paper-outline',
          name: 'user-info',
          component: resolve => { require(['@/views/group/user-management/user-info.vue'], resolve); }
        }
      ]
    },
      {
        path: '/user-management',
        title: '用户管理',
        name: 'user-management',
        icon: 'ios-paper-outline',
        component: Main,
        children: [
          { path: 'user-share',
            title: '用户分配',
            icon: 'ios-paper-outline',
            name: 'user-share',
            component: resolve => { require(['@/views/group/user-management/user-share.vue'], resolve); }
          },
          { path: 'add-new-service',
            title: '增值服务',
            icon: 'ios-paper-outline',
            name: 'add-new-service',
            component: resolve => { require(['@/views/group/user-management/add-new-service.vue'], resolve); }
          },
          { path: 'area-management',
            title: '区域管理',
            icon: 'ios-paper-outline',
            name: 'area-management',
            component: resolve => { require(['@/views/group/user-management/area-management.vue'], resolve); }
          },
          { path: 'user-info-1',
            title: '个人信息',
            icon: 'ios-paper-outline',
            name: 'user-info-1',
            component: resolve => { require(['@/views/group/user-management/user-info.vue'], resolve); }
          }
        ]
      }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
