<template>
  <v-card>
    <v-layout row>
      <v-flex xs2>
        <score-list />
      </v-flex>
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
import ScoreList from "@/components/ScoreList";
export default {
  components: { ScoreCard, ScoreList }
};
</script>

<style>
</style>
