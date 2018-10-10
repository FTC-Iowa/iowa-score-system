<template>
  <v-card>
    <v-data-iterator
      :items="matches"
      hide-actions
      row
      wrap
    >  
      <!-- <v-toolbar
        slot="header"
        color="blue"
        dark
      >
        <v-toolbar-title>Matches</v-toolbar-title>
      </v-toolbar> -->

        <template
          slot="item"
          slot-scope="props"
          xs12
          >
          <v-card dense @click.native="changeMatch(props.index)">
            <v-card-title>
              Match {{props.item.number}}
            </v-card-title>
            

            

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
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    },
    items: [
      {
        matchscore: 130,
        matchscoretwo: 123
      }
    ]
  }),
  computed: {
    matches() {
      return this.$store.state.event.matches;
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
