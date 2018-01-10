<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups">Explore Events</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/create">Create Event</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            v-bind:src="meetup.imageUrl"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)">
              <div class="title">
                Events in {{ meetup.title }}
              </div>
            </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Don't be afraid to join!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        meetups: [
          { imageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200', id: 'fghjklkjh', title: 'New York' },
          { imageUrl: 'http://www.seetorontonow.com/wp-content/uploads/2017/11/toronto-skyline-winter.jpg', id: 'haldjahfjf', title: 'Toronto' }
        ]
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetup/' + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    font-size: 2em;
    background-color: rgba(0,0,0,0.5);
    color: white;
    padding: 10px;
  }
</style>