import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
        id: 'fghjklkjh',
        title: 'New York',
        date: '2017-07-17'
      },
      {
        imageUrl: 'http://www.seetorontonow.com/wp-content/uploads/2017/11/toronto-skyline-winter.jpg',
        id: 'haldjahfjf',
        title: 'Toronto',
        date: '2017-08-29'
      }
    ],
    user: {
      id: 'sajdk',
      registeredMeetups: ['fghjklkjh']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      // pushing new meetup to meetups obj which will be formatted in payload
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      // since payload may have other properties we don't need (less efficient tho)
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'asjljfksdjkaf'
      }
      // reach out to firebase to store the meetup, get id, add to meetup
      // upload image, get image path as well

      // calls the createMeetup above and pushs it to loaded meetups
      commit('createMeetup', meetup)
    }
  },
  getters: {
    // gets all meetups
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    // display only 5 meetups
    featureMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    // loading a single meetup
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
})
