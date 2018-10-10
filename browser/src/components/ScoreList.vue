<template>
  <v-card>
    <v-data-iterator
      :items="matchinformation"
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

        <v-flex 
          slot="item"
          slot-scope="props"
          >
          <c-card>
            <v-card-title>Matches2</v-card-title>
            <v-divider/>

            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Match num:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.matchscore }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>match num 2:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.matchscoretwo }}</v-list-tile-content>
              </v-list-tile>

            </v-list>

          </c-card>
        </v-flex>

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
  }
  )

}

</script>

<style>
</style>
