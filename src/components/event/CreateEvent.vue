<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Creating a event</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent='onCreate'>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name='title'
                label='Title'
                id='title'
                v-model='title'
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name='location'
                label='Location'
                id='location'
                v-model='location'
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised @click="onFileSelect">Upload Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"/>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src='imageUrl' height = '300'>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name='description'
                label='Description'
                id='description'
                v-model='description'
                required
                multi-line>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                <h4> Choose a Date and Time </h4>
                </v-flex>
          </v-layout>
          <v-layout row class='mb-2'>
                <v-flex xs12 sm6 offset-sm3>
                <v-date-picker v-model='date'></v-date-picker>
                </v-flex>
          </v-layout>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                <v-time-picker v-model='time' format='24hr' ></v-time-picker>
                </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
              :disabled='!formIsValid'
              type='submit'>Create Event </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: this.image,
      description: '',
      date: '',
      time: new Date(),
      image: null
    }
  },
  computed: {
    formIsValid () {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
      )
    },
    submittableDateTime () {
      // check date and format it to send as prop
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        if (this.time) {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
      }
      return date
    }
  },
  methods: {
    onCreate () {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      const eventData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime
      }
      // calls store's create event with eventdata as param
      this.$store.dispatch('createEvent', eventData)
      this.$router.push('/events')
    },
    onFileSelect () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      const fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      // result is image as text
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
