<template>
  <v-container>
    <v-layout row wrap>
        <h6 class="title mb-5">Registered Events</h6>
    </v-layout>

    <v-layout row wrap v-for="event in getRegisteredEvents" :key="event.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card>
          <v-container fluid>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  :src="event.imageUrl"
                  height="130px">
                </v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="white--text"> {{ event.title }}</h3>
                    <div>{{ event.date | date}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/events/' + event.id">
                    <v-icon left>pageview</v-icon>
                    View Event
                  </v-btn>
                </v-card-actions>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    events () {
      return this.$store.getters.loadedEvents
    },
    getRegisteredEvents () {
      const registeredEventKeys = this.$store.getters.user.registeredEvents
      let registeredEvents = []
      registeredEventKeys.forEach(eventKey => {
        this.events.forEach(event => {
          if (event && (event.id === eventKey)) {
            registeredEvents.push(event)
          }
        })
      })
      return registeredEvents
    }
  }
}
</script>
