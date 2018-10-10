<template>
  <v-card>
    <v-data-iterator
      :items="matches"
      hide-actions
      row
      wrap
    >  
      <v-toolbar
        slot="header"
      >
        <v-toolbar-title>Matches</v-toolbar-title>
      </v-toolbar>

        <template
          slot="item"
          slot-scope="props"
          xs12
          >
          <v-card dense @click.native="changeMatch(props.index)" :color="matchColor[props.index]">
            <v-card-text>
              <v-layout row wrap align-center>
                <v-flex xs4>
                  <v-checkbox disabled :value="props.item.saved"></v-checkbox>
                </v-flex>
                <v-flex xs4>
                  Q-{{props.item.number}}
                </v-flex>
                <v-flex xs4 class="text-xs-center">
                  {{props.item.red.score.total}} - {{props.item.blue.score.total}}
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </template>

      <!-- <template slot="items" slot-scope="props" ma-0 pa-0>
        <td>{{ props.item.matchnumber }}</td>
        <td>{{ props.item.matchscore }} </td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          No matches have been generated yet.
        </v-alert>
      </template> -->
    </v-data-iterator>
</v-card>
</template>

<script>
export default {
  props: ["value"],
  data: () => ({
  }),
  computed: {
    matches() {
      return this.$store.state.event.matches;
    },
    matchColor() {
      var colors = [];
      this.matches.forEach((match, i) => {
        var color = "";
        if (this.value === i) {
          color = "yellow"
        } else if (match.saved === true) {
          if (match.red.score.total > match.blue.score.total) {
            color = "red"
          } else if (match.red.score.total < match.blue.score.total){
            color = "blue"
          } else {
            color = "grey"
          }
        }
        colors.push(color)
      })
      return colors; 
    }
  },
  methods: {
    changeMatch(match) {
      this.$emit("input", match)
    }
  }

}

</script>

<style>
</style>
