<template>
  <v-card>
    <v-btn color="success" @click="saveEvent">Save Event</v-btn>
    <v-btn color="success" @click="loadEvent">Load Event</v-btn>
    {{response}}
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    response: "response",
    data: {
      id: "eventid"
    }
  }),
  methods: {
    saveEvent() {
      console.log("save...");
      this.$store.dispatch("SAVE_EVENT");
    },
    loadEvent() {
      console.log("load...");
      this.$store.dispatch("LOAD_EVENT");
    }
  }
};
</script>

<style>
</style>
