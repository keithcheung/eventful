<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
              <v-card-title>Edit Event Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" style="width: 100%" actions>
              <template slot-scope="{save, canel}">
                <v-btn flat @click.native="onConfirmChanges">Confirm</v-btn>
                <v-btn flat @click.native="editDialog = false">Close</v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['event'],
    data () {
      return {
        editDialog: false,
        editableDate: null
      }
    },
    methods: {
      onConfirmChanges () {
        const newDate = new Date(this.event.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updateEvent', {
          id: this.event.id,
          date: newDate
        })
      }
    },
    created () {
      const datePicker = new Date(this.event.date)
      this.editableDate = datePicker.getUTCFullYear() + '-' + (datePicker.getUTCMonth() + 1) + '-' + datePicker.getUTCDate()
    }
  }
</script>
