/**********************************************/
/* src/main.js                                */
/**********************************************/

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/rem'
import './style/index.scss';
import store from './store/index'

Vue.config.productionTip = false

// 不重定向白名单
const whiteList = ['/login', '/signup', '/forget', '/authredirect'];

// 权限检查
router.beforeEach((to, from, next) => {
    document.title = (to.name || '') + ' - vue wap demo';
    next();
     if (store.getters.token) {
         if (to.path === '/login') {
             next({
                 path: '/messages'
             });
         } else {
            next();
        }
     } else {
         if (whiteList.indexOf(to.path) !== -1) {
             next()
         } else {
             next('/login')
         }
     }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
