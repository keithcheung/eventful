<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          interminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4>{{ event.title }}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-event-modal :event="event"></app-edit-event-modal>
            </template>
          </v-card-title>
          <v-card-media
            :src="event.imageUrl"
            height="450px"></v-card-media>
          <v-card-text>
            <div>{{ event.date | date}} - {{ event.location }} </div>
            <div v-if="userIsCreator">
              <app-edit-date-modal :event="event"></app-edit-date-modal>
              <app-edit-time-modal :event="event"></app-edit-time-modal>
            </div>
            <div> {{ event.description }} </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn>Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    event () {
      return this.$store.getters.loadedEvent(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.event.creatorId
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
