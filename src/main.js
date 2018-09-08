import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as firebase from 'firebase'
import App from './App'
import router from './router'

import { store } from './store'
import DateFiler from './filters/date'
import AlertComponent from './components/shared/Alert.vue'

Vue.use(Vuetify)

// Can use anywhere in our application
Vue.filter('date', DateFiler)
Vue.component('app-alert', AlertComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBhiS0gMDC0_XUL-cTOZnkPVK71eCwdWgQ',
      authDomain: 'eventful-ffba5.firebaseapp.com',
      databaseURL: 'https://eventful-ffba5.firebaseio.com',
      projectId: 'eventful-ffba5',
      storageBucket: 'eventful-ffba5.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadEvents')
  }
})
