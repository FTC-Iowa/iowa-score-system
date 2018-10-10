<template>
  <v-card>
    <v-layout row>
      <v-flex xs2>
        <score-list v-model="selectedMatch"/>
      </v-flex>
      <v-flex xs10>
        <v-card>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                <score-card ref="redMatch" color="red" :penalties="bluePenalties" @change:penalties="(val) => redPenalties = val" :number="selectedMatch"/>
              </v-flex>
              <v-flex xs6>
                <score-card ref="blueMatch" color="blue" :penalties="redPenalties" @change:penalties="(val) => bluePenalties = val" :number="selectedMatch"/>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="success" @click="saveMatch">Save Score</v-btn>
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
    bluePenalties: 0,
    selectedMatch: 0
  }),
  methods: {
    saveMatch() {
      var red = this.$refs.redMatch.getMatch();
      var blue = this.$refs.blueMatch.getMatch();
      var match = {};
      match.red = red;
      match.blue = blue;
      match.index = this.selectedMatch;
      this.$store.dispatch("SAVE_SCORE", match)
    }
  }
};
</script>

<style>
</style>
