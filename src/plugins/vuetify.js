import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VDataTable,
  VStepper,
  VCard
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VDataTable,
    VStepper,
    VCard
  },
  theme: {
    primary: "#f57e25",
    secondary: "#009cd7",
    accent: "#00a651",
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base
  },
  iconfont: 'md',
})
