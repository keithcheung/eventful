<template>
  <v-dialog persistent v-model="registerModal">
    <v-btn accent slot="activator">
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
              <v-card-title v-if="userIsRegistered">Unregister from Event</v-card-title>
              <v-card-title v-else="userIsRegistered">Register to Event</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your mind later.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat @click="onConfirm">Confirm</v-btn>
              <v-btn class="red--text" flat @click="registerModal = false">Cancel</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['eventId'],
    data () {
      return {
        registerModal: false
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredEvents.findIndex(eventId => {
          return eventId === this.eventId
        }) >= 0
      }
    },
    methods: {
      onConfirm () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserForEvent', this.eventId)
        } else {
          this.$store.dispatch('registerUserForEvent', this.eventId)
        }
      }
    }
  }
</script>
