import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import shortid from 'shortid';

const url = 'http://localhost:3000'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    eventid: "",
    event: { 
      id: "",
      teams: [],
      matches: []
    },
    eventList: [],
    saved: false,
    loaded: false
  },
  mutations: {
    OPEN_EVENT(state, event) {
      state.eventid = event.id;
      Vue.set(state, "event", event)
      state.loaded = true;
    },
    // SET_EVENT(state, event) {
    //   state.saved = false;
    //   state.event = event;
    // },
    DIRTY (state, val) {
      state.saved = val;
    },
    SAVE_MATCH_DATA(state, {matchNumber, color, data}) {
      Vue.set(state.event.matches[matchNumber],color,data)
      state.event.matches[matchNumber].saved = true;
    },
    EVENT_LIST (state, val) {
      Vue.set(state, "eventList", val)
    },
    UPDATE_HERE (state, {index, val}) {
      state.event.teams[index].here = val;
    }
  },
  actions: {
    CREATE_EVENT({commit, dispatch}, event) {
      var id = event.name.replace(/ /g, "_");//shortid.generate();
      event.id = id;
      event.matches = [];
      // open the event in the store
      commit("OPEN_EVENT", event);
      // make sure to save the event to disk...
      dispatch("SAVE_EVENT");
    },
    SAVE_EVENT({ commit, state }) {
      axios.post(url + '/api/event?id=' + state.eventid, state.event)
      .then(() => {
        commit('DIRTY', false)
      })
      .catch(e => {
      })
    },
    LOAD_EVENT({ commit, state }, id) {
      console.log("id:", id)
      if(!id) {
        id = state.eventid
      }
      axios.get(url + '/api/event?id=' + id)
      .then(response => {
        commit('OPEN_EVENT', response.data)
        commit('DIRTY', false)
      })
    },
    GET_EVENT_LIST({ commit }) {
      axios.get(url + '/api/event/list')
      .then(response => {
        commit("EVENT_LIST", response.data);
      })
    },
    GENERATE_MATCH_LIST( {commit, state }, matchesPerTeam) {
      // count the number of teams at this event...
      var numTeams = state.event.teams.reduce((count, x)=>x.here?count++:count);
      axios.get(url + '/api/matchlist/generate?' + "matchesPerTeam=" + matchesPerTeam + "&" + "numberTeams=" + numTeams) 
      .then(response => {
        console.log(response)
      });
    }
  }
});
