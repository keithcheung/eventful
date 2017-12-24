<template>
  <v-app dark>
    <v-toolbar>
      <v-toolbar-side-icon 
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Cars and Coffee</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat>
          <v-icon left>view_list</v-icon>
          View Meetup
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer 
      v-model="sideNav"
      temporary>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>view_list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            View Meetup
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <main>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    }
  }
</script>
