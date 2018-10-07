<template>
  <v-card>
    <v-card-text>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">Event Type</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="step > 2" step="2">Select Leagues</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="step > 3" step="3">Import Data</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4">Summary</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "SetupView",
  data: () => ({
    step: 1
  })
}
</script>

<style>

</style>
