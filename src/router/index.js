import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/meet/AllMeetUp'
import CreateMeetUp from '@/components/meet/CreateMeetUp'
import Profile from '@/components/user/Profile'
import Signin from '@/components/user/SignIn'
import Signup from '@/components/user/SignUp'
import Meetup from '@/components/meet/Meetup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetup/create',
      name: 'CreateMeetup',
      component: CreateMeetUp
    },
    {
      path: '/meetup/:id',
      name: 'Meetup',
      component: Meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
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
