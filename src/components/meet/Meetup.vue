<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4>{{ meetup.title }}</h4>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="450px"></v-card-media>
          <v-card-text>
            <div>{{ meetup.date }}</div>
            <div> Dummy text </div>
          </v-card-text>
          <v-card-action>
            <v-spacer></v-spacer>
            <v-btn>Register</v-btn>
          </v-card-action>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>
