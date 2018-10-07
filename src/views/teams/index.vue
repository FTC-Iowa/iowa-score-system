<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        hide-actions
        class="elevation-1"
        item-key="id"
        loading="true"
      >
        
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
      },{
        text: "number",
        value: "number"
      },{
        text: "name",
        value: "name"
      },{
        text: "organization",
        value: "organization"
      },{
        text: "edit"
      }
    ], 
    items: []
  })
}
</script>

<style>

</style>
