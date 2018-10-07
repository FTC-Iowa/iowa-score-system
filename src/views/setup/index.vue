<template>
  <v-card>
    <v-card-text>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">Event Info</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2">Select Leagues</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 3" step="3">Import Data</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4">Summary</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-layout wrap justify-space-around>
                <v-flex xs8>
                  <v-select
                    v-model="eventData.type"
                    :items="eventTypes"
                    label="Event Type"
                    solo
                  />
                </v-flex>
                <v-flex xs8>
                  <v-text-field
                    label="Event Location"
                    v-model="eventData.location"
                    solo
                  />
                </v-flex>
                <v-flex xs8>
                  <v-date-picker 
                    v-model="eventData.date" 
                    :landscape="true" 
                    :reactive="false"
                    label="Event Date"
                  />
                </v-flex>
              </v-layout>

              <v-card-actions>
                <v-spacer/>
                <v-btn flat>Cancel</v-btn>
                <v-btn
                  color="primary"
                  @click="step++"
                >
                  Continue
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card>
              <v-layout wrap justify-space-around>
                <v-flex xs8>
                  <v-select
                    v-model="eventData.league"
                    :items="leagueList"
                    label="League"
                    solo
                  />
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer/>
                <v-btn flat>Cancel</v-btn>
                <v-btn
                  color="primary"
                  @click="step++"
                >
                  Continue
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card>
              <v-layout wrap justify-space-around>
                <v-flex xs8>
                  <ul v-if="posts && posts.length">
                    <li v-for="post of posts">
                      <p><strong>{{post.name}}</strong></p>
                      <p>{{post.teams}}</p>
                    </li>
                  </ul>
                  <ul v-if="errors && errors.length">
                    <li v-for="error of errors">
                      {{error.message}}
                    </li>
                  </ul>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer/>
                <v-btn flat>Cancel</v-btn>
                <v-btn
                  color="primary"
                  @click="step++"
                >
                  Continue
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: "SetupView",
  data: () => ({
    step: 1,
    eventTypes: [
      'League Meet'
    ],
    leagueList: [
      'Alden',
      'Clark'
    ],
    posts: [],
    errors: [],
    eventData: {
      type: 'League Meet',
      location: '',
      date: null
    }
  }),

  created() {
    axios.get('http://us-central1-firstinspiresiowa2018.cloudfunctions.net/teamList?league=aldren')
    .then(response => {
      this.posts.push(response.data)
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style>

</style>
