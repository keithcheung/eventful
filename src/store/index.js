import Vue from 'vue'
import Vuex from 'vuex'

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
    user: {
      id: 'sajdk',
      registeredEvents: ['fghjklkjh']
    }
  },
  mutations: {
    createEvent (state, payload) {
      // pushing new event to events obj which will be formatted in payload
      state.loadedEvents.push(payload)
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
    }
  }
})
