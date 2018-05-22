import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const mainRouter = {
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => { require(['@/views/login.vue'], resolve); }
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  mainRouter
];
