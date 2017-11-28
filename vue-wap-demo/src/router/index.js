import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

const Login = r => require.ensure([], () => r(require('../page/login/login')), 'Login')

const Messages = r => require.ensure([], () => r(require('../page/messages/messages')), 'messages')
const Contacts = r => require.ensure([], () => r(require('../page/contacts/contacts')), 'contacts')
const Dynamics = r => require.ensure([], () => r(require('../page/dynamics/dynamics')), 'dynamics')
const Search = r => require.ensure([], () => r(require('../page/search/search')), 'search')

const PageNotFound = r => require.ensure([], () => r(require('../page/error/pageNotFound')), 'pageNotFound')

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    { path: '/login', name: 'Login', component: Login },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', redirect: '/login' },
        { path: '/messages', name: 'Messages', component: Messages },
        { path: '/contacts', name: 'Contacts', component: Contacts },
        { path: '/dynamics', name: 'Dynamics', component: Dynamics },
        { path: '/search', name: 'Search', component: Search }
      ]
    },
    { path: '*', component: PageNotFound }
  ]
})
