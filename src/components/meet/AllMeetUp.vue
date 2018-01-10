<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card>
          <v-container fluid>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  src="https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200"
                  height="130px"></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="white--text">My Meetup</h3>
                    <div>January 1st 2018</div>
                  </div>
                </v-card-title>
                <v-card-action>
                  <v-btn flat to="/meetup/1">
                    <v-icon left>pageview</v-icon>
                    View Meetup
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
