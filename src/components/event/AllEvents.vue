<template>
  <v-container>
    <v-layout row wrap v-for="event in events" :key="event.id" class="mb-2">
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
                <v-card-action>
                  <v-btn flat :to="'/events/' + event.id">
                    <v-icon left>pageview</v-icon>
                    View Event
                  </v-btn>
                </v-card-action>
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
    }
  }
}
</script>
