<template>
  <v-card>
    <v-btn color="success" @click="saveEvent">Save Event</v-btn>
  </v-card>
</template>

<script>
export default {
  methods: {
    saveEvent() {
      console.log("save...");
    }
  }
};
</script>

<style>
</style>
