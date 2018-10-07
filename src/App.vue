<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="false"
      :clipped="true"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="{name: item.name}"
        >
          <v-list-tile-action>
            <!-- <v-icon v-html="item.icon"></v-icon> -->
            {{item.icon}}
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="true"
      color="primary"
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="true" app>
      <span>&copy; 2018 FTC Iowa, Jeramie Vens, Emma Onstad, Jason Cheng</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      items: [{
        icon: '1',
        title: 'Setup Event',
        name: 'setup'
      },{
        icon: '2',
        title: 'Generate Matchlist',
        name: 'matchlist'
      },{
        icon: '3',
        title: 'Enter Scores',
        name: 'scores'
      },{
        icon: '4',
        title: 'Save Results',
        name: 'save'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'FTC Iowa Score System'
    }
  }
}
</script>
