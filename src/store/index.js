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
    user: null,
    loading: false,
    error: false
  },
  mutations: {
    setLoadedEvents (state, payload) {
      state.loadedEvents = payload
    },
    createEvent (state, payload) {
      // pushing new event to events obj which will be formatted in payload
      state.loadedEvents.push(payload)
    },
    // this refers to the actual vuex state
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadEvents ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('events').once('value')
        .then((data) => {
          const events = []
          const obj = data.val()
          for (let key in obj) {
            events.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              dat: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedEvents', events)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', true)
          }
        )
    },
    createEvent ({commit, getters}, payload) {
      // since payload may have other properties we don't need (less efficient tho)
      const event = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('events').push(event)
        .then((data) => {
          const key = data.key

          console.log(data)
          commit('createEvent', {
            ...event,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // reach out to firebase to store the event, get id, add to event
      // upload image, get image path as well
      // calls the createEvent above and pushs it to loaded events
    },
    signUserUp ({commit}, payload) {
      // commit calls the mutations
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
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
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.user.uid,
              registeredEvents: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredEvents: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
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
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
