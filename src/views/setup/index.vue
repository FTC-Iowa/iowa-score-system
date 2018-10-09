<template>
  <v-card>
    <v-card-text v-if="$store.state.loaded">
      Event open
    </v-card-text>

    <v-card-text v-else-if="!create">
      <v-layout column wrap justify-center>
        <v-flex xs12 class="text-xs-center">
          <h2>Open existing event</h2>
        </v-flex>
        <v-flex xs5>
          <v-select
            :items="$store.state.eventList"
            v-model="selectedEvent"
            label="Select Event To Open"
            item-value="id"
            item-text="name"
            solo
          />
        </v-flex>
        <v-flex xs12 class="text-xs-center">
          <v-btn color="primary" :disabled="!selectedEvent" @click="openEvent">Open Event</v-btn>
        </v-flex>
        <v-flex xs12 class="text-xs-center">
          <h2>~~ OR ~~</h2>
        </v-flex>
        <v-flex xs12 class="text-xs-center">
          <v-btn color="primary">Import event file</v-btn>
        </v-flex>
        <v-flex xs12 class="text-xs-center">
          <h2>~~ OR ~~</h2>
        </v-flex>
        <v-flex xs12 class="text-xs-center">
          <v-btn color="primary" @click="startCreate">Create new event</v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-text v-else>
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
                    :show-current="false"
                    label="Event Date"
                  />
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer/>
                <v-btn flat @click="cancel">Cancel</v-btn>
                <v-btn
                  color="primary"
                  @click="step++"
                  :disabled="!step1Finished"
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
                    item-text="text"
                    item-value="value"
                    label="League"
                    solo
                  />
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer/>
                <v-btn flat
                  @click="goToStep(1)"
                >Back</v-btn>
                <v-btn flat @click="cancel">Cancel</v-btn>
                <v-btn
                  color="primary"
                  @click="goToStep(3)"
                  :disabled="!step2Finished"
                >
                  Continue
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card>
              <v-layout row wrap justify-center="">
                <v-flex class="text-xs-center" v-if="loading.isLoading">
                  Attempting to load team list from server...<br>
                  <v-progress-circular 
                    :size="100"
                    :width="8"
                    color="primary"
                    indeterminate
                  />
                </v-flex>
                <v-flex class="text-xs-center" v-if="!loading.isLoading && loading.success">
                  Successfully loaded {{eventData.teams.length}} teams from server.
                </v-flex>
                <v-flex class="text-xs-center" v-if="!loading.isLoading && !loading.success">
                  <v-layout column>
                    <v-flex>
                      Unable to contact server.  Either connect to internet and try again or manually download league file from server and upload.
                    </v-flex>
                    <v-flex>
                      <v-btn color="primary" @click="loadLeagueData">Retry Connecting To Server</v-btn>
                    </v-flex>
                    <v-flex>
                      ~~ OR ~~
                    </v-flex>
                    <v-flex>
                      On a computer with internet access navitgate to 
                      <a :href="'https://firstinspiresiowa.org/league/' + eventData.league">firstinspiresiowa.org/league/{{eventData.league}}</a>
                      and download League Data File.  Click the button below to upload League Data File to the score system.
                    </v-flex>
                    <v-flex>
                      <v-btn color="primary" @click="">Upload League Data File</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer/>
                <v-btn flat
                  @click="goToStep(2)"
                >Back</v-btn>
                <v-btn flat @click="cancel">Cancel</v-btn>
                <v-btn
                  color="primary"
                  @click="goToStep(4)"
                  :disabled="!loading.success"
                >
                  Continue
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-card>
              <v-layout row wrap justify-center>
                <v-flex xs6>
                  Event Name: {{eventData.name}}<br>
                  Event Type: {{eventData.type}}<br>
                  Event Date: {{eventData.date}}<br>
                  Event Location: {{eventData.location}}<br>
                  Teams: <span v-for="team in eventData.teams" :key="team.number">{{team.number}}, </span>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer/>
                <v-btn flat
                  @click="goToStep(3)"
                >Back</v-btn>
                <v-btn flat @click="cancel">Cancel</v-btn>
                <v-btn
                  color="primary"
                  @click="saveEvent"
                >
                  Finished
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
    create: false,
    selectedEvent: null,
    step: 1,
    eventTypes: ["League Meet"],
    leagueList: [
      {text: "Aldren League", value: "aldren" },
      {text: "Armstrong League", value: "armstrong" },
      {text: "Burnell League", value: "burnell" },
      {text: "Clark League", value: "clark" },
      {text: "Faber League", value: "faber" },
      {text: "Galileo League", value: "galileo" },
      {text: "Glenn League", value: "glenn" },
      {text: "Hammel League", value: "hammel" },
      {text: "Hubble League", value: "hubble" },
      {text: "Johnson League", value: "johnson" },
      {text: "Lovell League", value: "lovell" },
      {text: "Porco League", value: "porco" },
      {text: "Roman League", value: "roman" },
      {text: "Rubin League", value: "rubin" },
      {text: "Sagan League", value: "sagan" },
      {text: "Van Allen League", value: "vanallen" },
      {text: "Vaughan League", value: "vaughan" },
      {text: "Whitson League", value: "whitson" }
    ],
    eventData: {
      name: "",
      type: "League Meet",
      location: "",
      date: null,
      league: null,
      teams: [],
      id: ""
    },
    loading: {
      isLoading: true,
      success: false
    }
  }),
  computed: {
    step1Finished() {
      return this.eventData.type && this.eventData.location && this.eventData.date;
    },
    step2Finished() {
      return this.eventData.league
    }
  },
  methods: {
    openEvent() {
      console.log(this.selectedEvent)
      this.$store.dispatch("LOAD_EVENT", this.selectedEvent)
    },
    startCreate() {
      this.step = 1;
      this.create = true;
    },
    saveEvent() {
      this.$store.dispatch("CREATE_EVENT", this.eventData);
      this.create = false;
      // this.$store./
    },
    cancel() {
      this.create = false;
    },
    loadLeagueData() {
      this.step = 3;
      this.loading.isLoading = true;
      axios.get('http://us-central1-firstinspiresiowa2018.cloudfunctions.net/teamList?league=' + this.eventData.league)
      .then(response => {
        console.log('response: ', response)
        var teams = response.data;
        teams.forEach(team => {
          team.here = true
        });
        this.eventData.teams = teams;
        this.loading.success = true;
        this.loading.isLoading = false;
      })
      .catch(e => {
        this.loading.success = false;
        this.loading.isLoading = false;
        console.log('unable to contact server')
      })
    },
    goToStep(step) {
      switch(step) {
        case 1:
          this.step = 1;
          break;
        case 2:
          this.step = 2;
          break;
        case 3:
          this.step = 3;
          this.loadLeagueData();
          break;
        case 4: 
          if (this.eventData.type === "League Meet") {
            this.eventData.name = this.leagueList.find(x => x.value === this.eventData.league).text + " Meet " + 1;
          }
          this.step = 4;
          break;
      }
    }
  },
  mounted() {
    this.$store.dispatch("GET_EVENT_LIST")
  }
}
</script>

<style>
</style>
