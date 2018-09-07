<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/events">Explore Events</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/event/create">Create Event</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          interminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="event in events"
            v-bind:src="event.imageUrl"
            :key="event.id"
            @click="onLoadEvent(event.id)">
              <div class="title">
                Events in {{ event.title }}
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
    computed: {
      events () {
        return this.$store.getters.featureEvents
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadEvent (id) {
        this.$router.push('/events/' + id)
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
