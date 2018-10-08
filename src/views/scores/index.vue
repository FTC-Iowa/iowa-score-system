<template>
  <v-card>
    <v-layout row>
      <v-flex xs2>
        <score-list />
      </v-flex>
      <v-flex xs10>
        <v-card>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                <score-card color="red" :penalties="bluePenalties" @change:penalties="(val) => redPenalties = val"/>
              </v-flex>
              <v-flex xs6>
                <score-card color="blue" :penalties="redPenalties" @change:penalties="(val) => bluePenalties = val"/>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="success">Save Score</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
  
</template>

<script>
import ScoreCard from "@/components/ScoreCard";
import ScoreList from "@/components/ScoreList";
export default {
  components: { ScoreCard, ScoreList },
  data: () => ({
    redPenalties: 0,
    bluePenalties: 0
  })
};
</script>

<style>
</style>
