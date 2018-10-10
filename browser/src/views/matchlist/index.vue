<template>
  <v-card>
    <v-card-text v-if="!isGenerated">
      <v-layout row wrap justify-center>
        <v-flex xs8>
          <v-text-field
            label="Matches Per Team"
            v-model="matchesPerTeam"
            :readonly="true"
          ></v-text-field>
        </v-flex>
        <v-flex xs8 class="text-xs-center">
          <v-btn 
            color="success" 
            large 
            @click="generate"
            :loading="loading"
            :disabled="loading"
          >
            Generate
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-text v-if="isGenerated">
      <v-data-table
        :headers="headers"
        :items="matches"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{props.item.number}}</td>
          <td>{{props.item.red.teams[0].number}}{{props.item.red.teams[0].surrogate?"*":""}}</td>
          <td>{{props.item.red.teams[1].number}}{{props.item.red.teams[1].surrogate?"*":""}}</td>
          <td>{{props.item.blue.teams[0].number}}{{props.item.blue.teams[0].surrogate?"*":""}}</td>
          <td>{{props.item.blue.teams[1].number}}{{props.item.blue.teams[1].surrogate?"*":""}}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    matchesPerTeam: 5,
    loading: false,
    headers: [
      {
        text: "Number",
        value: "number"
      },
      {
        text: "Red 1",
        value: "red1"
      },
      {
        text: "Red 2",
        value: "red2"
      },
      {
        text: "Blue 1",
        value: "blue1"
      },
      {
        text: "Blue 2",
        value: "blue2"
      }
    ]
  }),
  computed: {
    isGenerated() {
      return this.$store.state.event.matches.length > 0;
    },
    matches() {
      return this.$store.state.event.matches;
    }
  },
  methods: {
    generate() {
      this.loading = true;
      this.$store.dispatch("GENERATE_MATCH_LIST", this.matchesPerTeam);
    }
  },
  watch: {
    isGenerated: {
      immediate: true,
      handler(newVal) {
        if(newVal)
          this.loading = false;
      }
    }
  }
};
</script>

<style>
</style>
