import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    eventid: "eventid",
    event: { id: "eventid" }
  },
  mutations: {
    SET_EVENT(state, event) {
      state.event = event;
    }
  },
  actions: {
    SAVE_EVENT({ commit, state }, ref) {
      axios.post('http://localhost:3000/api/event?id=' + state.eventid, state.event)
      .then(response => {
      })
      .catch(e => {
      })
    },
    LOAD_EVENT({ commit, state }, req) {
      axios.get('http://localhost:3000/api/event?id=' + state.eventid)
      .then(response => {
        commit('SET_EVENT', response.data)
      })
    }
  }
});
