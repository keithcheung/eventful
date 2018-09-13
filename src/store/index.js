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
    registerUserForEvent (state, payload) {
      const id = payload.id
      if (state.user.registeredEvents.findIndex(event => event.id === id) >= 0) {
        return
      }
      state.user.registeredEvents.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserForEvent (state, payload) {
      const registeredEvents = state.user.registeredEvents
      registeredEvents.splice(registeredEvents.findIndex(event => event.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedEvents (state, payload) {
      state.loadedEvents = payload
    },
    createEvent (state, payload) {
      // pushing new event to events obj which will be formatted in payload
      state.loadedEvents.push(payload)
    },
    updateEvent (state, payload) {
      const event = state.loadedEvents.find(event => {
        return event.id === payload.id
      })
      if (payload.title) {
        event.title = payload.title
      }
      if (payload.description) {
        event.description = payload.description
      }
      if (payload.date) {
        event.date = payload.date
      }
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
    registerUserForEvent ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForEvent', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserForEvent ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey).remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserForEvent', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadEvents ({ commit }) {
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
              date: obj[key].date,
              location: obj[key].location,
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
    createEvent ({ commit, getters }, payload) {
      // since payload may have other properties we don't need (less efficient tho)
      const event = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('events').push(event)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const fileName = payload.image.name
          const ext = fileName.slice(fileName.lastIndexOf('.'))
          return firebase.storage().ref('events/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          return fileData.ref.getDownloadURL()
        })
        .then(imageUrl => {
          return firebase.database().ref('events').child(key).update({ imageUrl: imageUrl })
        })
        .then(() => {
          commit('createEvent', {
            ...event,
            imageUrl: imageUrl,
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
    updateEvent ({commit}, payload) {
      commit('setLoading', true)
      const updatedEvent = {}
      if (payload.title) {
        updatedEvent.title = payload.title
      }
      if (payload.description) {
        updatedEvent.description = payload.description
      }
      if (payload.date) {
        updatedEvent.date = payload.date
      }
      firebase.database().ref('events').child(payload.id).update(updatedEvent)
        .then(() => {
          updatedEvent.id = payload.id
          commit('setLoading', false)
          commit('updateEvent', updatedEvent)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({ commit }, payload) {
      // commit calls the mutations
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.user.uid,
              registeredEvents: [],
              fbKeys: {}
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
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.user.uid,
              registeredEvents: [],
              fbKeys: {}
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
    autoSignIn ({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredEvents: [], fbKeys: {} })
    },
    fetchUserData ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
        .then(data => {
          const dataPairs = data.val()
          let registeredEvents = []
          let swappedPairs = {}
          for (let key in dataPairs) {
            registeredEvents.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registeredEvents: registeredEvents,
            fbKeys: swappedPairs
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({ commit }) {
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
