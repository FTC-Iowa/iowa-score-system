import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    eventid: "eventid",
    event: { id: "eventid" },
    saved: false
  },
  mutations: {
    SET_EVENT(state, event) {
      state.saved = false;
      state.event = event;
    },
    DIRTY (state, val) {
      state.saved = val;
    }
  },
  actions: {
    SAVE_EVENT({ commit, state }) {
      axios.post('http://localhost:3000/api/event?id=' + state.eventid, state.event)
      .then(() => {
        commit('DIRTY', false)
      })
      .catch(e => {
      })
    },
    LOAD_EVENT({ commit, state }) {
      axios.get('http://localhost:3000/api/event?id=' + state.eventid)
      .then(response => {
        commit('SET_EVENT', response.data)
        commit('DIRTY', false)
      })
    }
  }
});
