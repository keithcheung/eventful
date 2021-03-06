import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Events from '@/components/event/AllEvents'
import CreateEvent from '@/components/event/CreateEvent'
import Profile from '@/components/user/Profile'
import Signin from '@/components/user/SignIn'
import Signup from '@/components/user/SignUp'
import Event from '@/components/event/Event'
import AuthGuard from './auth-guard'

Vue.use(Router)
// Storing all the routes
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/event/create',
      name: 'CreateEvent',
      component: CreateEvent,
      beforeEnter: AuthGuard
    },
    {
      path: '/events/:id',
      name: 'Event',
      props: true,
      component: Event
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
