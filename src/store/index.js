import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedEvents: [
      {
        imageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
        id: 'fghjklkjh',
        title: 'New York',
        location: 'New York',
        date: new Date(),
        description: 'yay'
      },
      {
        imageUrl: 'http://www.seetorontonow.com/wp-content/uploads/2017/11/toronto-skyline-winter.jpg',
        id: 'haldjahfjf',
        title: 'Toronto',
        location: 'Toronto',
        date: new Date(),
        description: 'work'
      }
    ],
    // User will be from firebase as well
    user: null
  },
  mutations: {
    createEvent (state, payload) {
      // pushing new event to events obj which will be formatted in payload
      state.loadedEvents.push(payload)
    },
    // this refers to the actual vuex state
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createEvent ({commit}, payload) {
      // since payload may have other properties we don't need (less efficient tho)
      const event = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'asjljfksdjkaf'
      }
      // reach out to firebase to store the event, get id, add to event
      // upload image, get image path as well

      // calls the createEvent above and pushs it to loaded events
      commit('createEvent', event)
    },
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.user.uid,
              registeredEvents: []
            }
            // calls the mutation
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    }
  },
  getters: {
    // gets all events
    loadedEvents (state) {
      return state.loadedEvents.sort((eventA, eventB) => {
        return eventA.date > eventB.date
      })
    },
    // display only 5 events
    featureEvents (state, getters) {
      return getters.loadedEvents.slice(0, 5)
    },
    // loading a single event
    loadedEvent (state) {
      return (eventId) => {
        return state.loadedEvents.find((event) => {
          return event.id === eventId
        })
      }
    },
    user (state) {
      return state.user
    }
  }
})
