<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="teams"
        hide-actions
        class="elevation-1"
        item-key="id"
        loading="true"
      >
        <template slot="items" slot-scope="props">
          <td><v-checkbox label="" :value="props.item.here" @change="updateHere($event, props.index)"/></td>
          <td>{{props.item.number}}</td>
          <td>{{props.item.name}}</td>
          <td>{{props.item.organization}}</td>
          <td>{{JSON.stringify(props.index)}}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "SetupView",
  data: () => ({
    headers: [
      {
        text: "here",
        value: "here"
      },
      {
        text: "number",
        value: "number"
      },
      {
        text: "name",
        value: "name"
      },
      {
        text: "organization",
        value: "organization"
      },
      {
        text: "edit"
      }
    ],
  }),
  computed: {
    teams() {
      return this.$store.state.event.teams;
    }
  },
  methods: {
    updateHere(val, index) {
      this.$store.commit('UPDATE_HERE',{index: index, val: val})
    }
  }
};
</script>

<style>
</style>
