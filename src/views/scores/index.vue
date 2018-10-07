<template>
  <v-card>
    <v-layout row>
      <v-flex xs5>
        <score-card color="red"/>
      </v-flex>
      <v-flex xs5>
        <score-card color="blue"/>
      </v-flex>
    </v-layout>
  </v-card>
  
</template>

<script>
import ScoreCard from "@/components/ScoreCard";
export default {
  components: { ScoreCard }
};
</script>

<style>
</style>
