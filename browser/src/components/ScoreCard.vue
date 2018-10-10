<template>
    <v-card>
      <v-card-title>
        <v-toolbar :color="color" dark>
          <v-toolbar-title>{{color === 'red' ? "RED" : "BLUE"}} ALLIANCE</v-toolbar-title>
          <v-spacer/>
          SCORE: {{totalScore}}
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap align-center justify-space-around>
          <v-flex xs4 class="text-xs-center">
            Team {{data.teams[0].number}}:
          </v-flex>
          <v-flex xs4>
            <v-checkbox v-model="data.teams[0].noshow" label="No Show"/>
          </v-flex>
          <v-flex xs4>
            <v-checkbox v-model="data.score.auto.latched[0]" label="Latched"/>
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            Team {{data.teams[1].number}}:
          </v-flex>
          <v-flex xs4>
            <v-checkbox v-model="data.teams[1].noshow" label="No Show"/>
          </v-flex>
          <v-flex xs4>
            <v-checkbox v-model="data.score.auto.latched[1]" label="Latched"/>
          </v-flex>

          <v-flex class="grey text-xs-center" xs12>
            AUTONOMOUS
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            Robot 1:
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Landed" v-model="data.score.auto.landed[0]"/>
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Claimed" v-model="data.score.auto.claimed[0]"/>
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Parked" v-model="data.score.auto.parked[0]"/>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            Robot 2:
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Landed" v-model="data.score.auto.landed[1]"/>
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Claimed" v-model="data.score.auto.claimed[1]"/>
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Parked" v-model="data.score.auto.parked[1]"/>
          </v-flex>
          <v-flex xs4>
            <v-checkbox label="Sample Field 1" v-model="data.score.auto.sample[0]"/>
          </v-flex>
          <v-flex xs4>
            <v-checkbox label="Sample Field 2" v-model="data.score.auto.sample[1]"/>
          </v-flex>

          <v-flex class="grey text-xs-center" xs12>
            DRIVER-CONTROLLED
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            Gold Cargo Hold
            <number-input v-model="data.score.tele.leftCargoHold" center controls/>
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            Silver Cargo Hold
            <number-input v-model="data.score.tele.rightCargoHold" center controls/>
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            Minerals In Depot
            <number-input v-model="data.score.tele.mineralsInDepot" center controls/>
          </v-flex>


          <v-flex class="grey text-xs-center" xs12>
            END GAME
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <div>Robot 1 Location</div>
            <v-radio-group v-model="data.score.endgame.location[0]">
              <v-radio label="No Bonus" :value="0"/>
              <v-radio label="Partially in Crater" :value="15"/>
              <v-radio label="In Crater" :value="25"/>
              <v-radio label="Latched on Lander" :value="50"/>
            </v-radio-group>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <div>Robot 2 Location</div>
            <v-radio-group v-model="data.score.endgame.location[1]">
              <v-radio label="No Bonus" :value="0"/>
              <v-radio label="Partially in Crater" :value="15"/>
              <v-radio label="In Crater" :value="25"/>
              <v-radio label="Latched on Lander" :value="50"/>
            </v-radio-group>
          </v-flex>

          <v-flex class="grey text-xs-center" xs12>
            PENALTIES
          </v-flex>
          <v-flex xs5 class="text-xs-center">
            Minor
            <number-input v-model="data.score.penalties.minor" center controls/>
          </v-flex>
          <v-flex xs5 class="text-xs-center">
            Major
            <number-input v-model="data.score.penalties.major" center controls/>
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            Team {{data.teams[0].number}}:
          </v-flex>
          <v-flex xs4>
            <v-checkbox v-model="data.teams[0].yellow" label="Yellow Card" color="yellow darken-2"/>
          </v-flex>
          <v-flex xs4>
            <v-checkbox v-model="data.teams[0].red" label="Red Card" color="red"/>
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            Team {{data.teams[1].number}}:
          </v-flex>
          <v-flex xs4>
            <v-checkbox v-model="data.teams[1].yellow" label="Yellow Card" color="yellow darken-2"/>
          </v-flex>
          <v-flex xs4>
            <v-checkbox v-model="data.teams[1].red" label="Red Card" color="red"/>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    
</template>

<script>
import NumberInput from "@chenfengyuan/vue-number-input";
import Vue from "vue"
import dcopy from "deep-copy"

export default {
  props: ["color", "number", "penalties"],
  components: { NumberInput },
  data: () => ({
    data: {
      score: {
        auto: {
          latched: [false,false],
          landed: [false,false],
          claimed: [false,false],
          parked: [false,false],
          sample: [false,false],
          total: 0
        },
        tele: {
          leftCargoHold: 0,
          rightCargoHold: 0,
          mineralsInDepot: 0,
          total: 0
        },
        endgame: {
          location: [0,0],
          total: 0
        },
        penalties: {
          minor: 0,
          major: 0,
          total: 0
        }, 
        total: 0
      },
      teams: [
        {
          disqualified: false,
          noshow: false,
          number: 1111,
          surrogate: false,
          yellow: false
        },{
          disqualified: false,
          noshow: false,
          number: 2222,
          surrogate: false,
          yellow: false
        }
      ]
    }
  }),
  computed: {
    autoScore() {
      return 30*this.data.score.auto.landed[0] + 30*this.data.score.auto.landed[1]
              + 15*this.data.score.auto.claimed[0] + 15*this.data.score.auto.claimed[1] 
              + 10*this.data.score.auto.parked[0] + 10*this.data.score.auto.parked[1]
              + 25*this.data.score.auto.sample[0] + 25*this.data.score.auto.sample[1];
    },
    teleScore() {
      return 2*this.data.score.tele.mineralsInDepot + 5*this.data.score.tele.leftCargoHold + 5*this.data.score.tele.rightCargoHold;
    },
    endScore() {
      return this.data.score.endgame.location[0] + this.data.score.endgame.location[1] ;
    },
    penaltiesScore() {
      return 10*this.data.score.penalties.minor + 40*this.data.score.penalties.major;
    },
    totalScore() {
      return this.autoScore + this.teleScore + this.endScore + this.penalties;
    }
  },
  watch: {
    penaltiesScore: {
      immediate: true,
      handler(newVal) {
        console.log('handler', newVal)
        this.$emit('change:penalties', newVal)
      }
    },
    number: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log('match number changed', newVal);
        // if(oldVal){
        //   this.saveMatch(false, oldVal);
        // }
        var match = dcopy(this.$store.state.event.matches[newVal])
        if(match) {
          console.log("set match: ", match)
          Vue.set(this.data, "score", match[this.color].score)
          Vue.set(this.data, "teams", match[this.color].teams)
        }
        //todo switch to the new match
      }
    }
  },
  methods: {
    getMatch(number) {
      // if(this.$store.state.event.matches[number].saved !== true) {
      this.data.score.auto.total = this.autoScore;
      this.data.score.tele.total = this.teleScore;
      this.data.score.endgame.total = this.endScore;
      this.data.score.penalties.total = this.penalties;
      this.data.score.total = this.totalScore;
      return dcopy(this.data);
    }
  }
};
</script>

<style  lang="scss">
.v-card__text {
  padding-top: 0;
  padding-bottom: 0;
}
.v-input--radio-group {
  margin-top: 0;
}
.v-input--checkbox {
  margin-top: 0;
  padding-top: 6px;
  .v-messages {
    display: none !important;
  }
  .v-input__slot {
    margin-bottom: 6px;
  }
}

.number-input {
  margin-bottom: 12px;
}
</style>
