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
    },
    ADD_MATCH(state, match) {
      state.event.matches.push(match);
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
    GENERATE_MATCH_LIST( {commit, state, dispatch }, matchesPerTeam) {
      // count the number of teams at this event...
      var hereList = state.event.teams.filter(x=>x.here)
      var numTeams = hereList.length;
      if(numTeams === 0) return;
      axios.get(url + '/api/matchlist?' + "matchesPerTeam=" + matchesPerTeam + "&" + "numberTeams=" + numTeams) 
      .then(response => {
        console.log(response.data)
        var rows = response.data.split("\n")
        rows.forEach(row => {
          var cols = row.split(" ");
          if(cols.length === 9) {
            var match = {
              number: parseInt(cols[0]),
              type: "Qualification",
              saved: "false",
              eventId: state.eventid,
              division: 1,
              red: {
                score: {
                  auto: {
                    latched: [false,false],
                    landed: [false,false],
                    claimed: [false,false],
                    parked: [false,false],
                    sample: [false,false],
                    total: 0
                  },
                  tele: {
                    leftCargoHold: 0,
                    rightCargoHold: 0,
                    mineralsInDepot: 0,
                    total: 0
                  },
                  endgame: {
                    location: [0,0],
                    total: 0
                  },
                  penalties: {
                    minor: 0,
                    major: 0,
                    total: 0
                  }, 
                  total: 0
                },
                teams: [
                  {
                    disqualified: false,
                    noshow: false,
                    number: hereList[parseInt(cols[1])-1].number,
                    surrogate: cols[2] === "1",
                    yellow: false
                  },{
                    disqualified: false,
                    noshow: false,
                    number: hereList[parseInt(cols[3])-1].number,
                    surrogate: cols[4] === "1",
                    yellow: false
                  }
                ]
              },
              blue: {
                score: {
                  auto: {
                    latched: [false,false],
                    landed: [false,false],
                    claimed: [false,false],
                    parked: [false,false],
                    sample: [false,false],
                    total: 0
                  },
                  tele: {
                    leftCargoHold: 0,
                    rightCargoHold: 0,
                    mineralsInDepot: 0,
                    total: 0
                  },
                  endgame: {
                    location: [0,0],
                    total: 0
                  },
                  penalties: {
                    minor: 0,
                    major: 0,
                    total: 0
                  }, 
                  total: 0
                },
                teams: [
                  {
                    disqualified: false,
                    noshow: false,
                    number: hereList[parseInt(cols[5])-1].number,
                    surrogate: cols[6] === "1",
                    yellow: false
                  },{
                    disqualified: false,
                    noshow: false,
                    number: hereList[parseInt(cols[7])-1].number,
                    surrogate: cols[8] === "1",
                    yellow: false
                  }
                ]
              }
            }
            // console.log(match)
            commit("ADD_MATCH", match);
          }
        })
        dispatch("SAVE_EVENT");
      });
    }
  }
});
