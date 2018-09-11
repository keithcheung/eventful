import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as firebase from 'firebase'
import App from './App'
import router from './router'

import { store } from './store'
import DateFiler from './filters/date'
import AlertComponent from './components/shared/Alert.vue'
import EditEventDetailsModal from './components/event/edit/EditEventDetailsModal.vue'
import EditEventDateModal from './components/event/edit/EditEventDateModal.vue'
import EditEventTimeModal from './components/event/edit/EditEventTimeModal.vue'

Vue.use(Vuetify)

// Can use anywhere in our application
Vue.filter('date', DateFiler)
Vue.component('app-alert', AlertComponent)
Vue.component('app-edit-event-modal', EditEventDetailsModal)
Vue.component('app-edit-date-modal', EditEventDateModal)
Vue.component('app-edit-time-modal', EditEventTimeModal)
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
      storageBucket: 'gs://eventful-ffba5.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadEvents')
  }
})
