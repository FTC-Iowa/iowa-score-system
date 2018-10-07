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
          <td>{{props.item.red1}}</td>
          <td>{{props.item.red2}}</td>
          <td>{{props.item.blue1}}</td>
          <td>{{props.item.blue2}}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    isGenerated: false,
    matchesPerTeam: 5,
    loading: false,
    matches: [
      {
        number: 1,
        red1: 1111,
        red2: 2222,
        blue1: 3333,
        blue2: 4444
      },
      {
        number: 2,
        red1: 5555,
        red2: 6666,
        blue1: 7777,
        blue2: 8888
      }
    ],
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
  methods: {
    generate() {
      this.loading = true;

      this.isGenerated = true;
    }
  }
};
</script>

<style>
</style>
