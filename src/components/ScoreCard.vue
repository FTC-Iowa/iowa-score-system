<template>
    <v-card>
      <v-layout justify-center>
        <v-flex>
          <v-toolbar :color="color" dark>
            <v-toolbar-title>Color Alliance</v-toolbar-title>
          </v-toolbar>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
        <div>Team 1: ##### </div>
        </v-flex>
        <v-flex xs3>
      <v-checkbox
          v-model="Team1CheckNoShow"
          label="No Show"
      ></v-checkbox>
      </v-flex>
        <v-flex xs3>
          <v-checkbox
            v-model="Team1CheckPresent"
            label="Present"
            value: true
          ></v-checkbox>
        </v-flex>
        <v-flex xs3>
          <v-checkbox
            v-model="Team1CheckLatched"
            label="Latched"
          ></v-checkbox>
        </v-flex>
      </v-layout>
      <v-divider/>
        <v-layout>
        <v-flex xs3>
        <div>Team 2: #####</div>
        </v-flex>
        <v-flex xs3>
      <v-checkbox v-model="Team2CheckNoShow" label="No Show"></v-checkbox>
      </v-flex>
        <v-flex xs3>
        <v-checkbox v-model="Team2CheckPresent" label="Present"
        ></v-checkbox>
      </v-flex>
        <v-flex xs3>
        <v-checkbox v-model="Team2CheckLatched" label="Latched"></v-checkbox>
      </v-flex>
      </v-layout> 

      <v-divider/>
      <v-layout row wrap>
        <v-flex xs12>
          <div> Autonomous </div>
        </v-flex>
        <v-flex xs6>
          <v-checkbox v-model="Robot1Landed" label="Robot 1 Landed"></v-checkbox>
        </v-flex>
        
        <v-flex xs6>
          <v-checkbox v-model="Robot2Landed" label="Robot 2 Landed"></v-checkbox>
        </v-flex>

        <v-flex xs6>
          <v-checkbox v-model="Robot1Claimed" label="Robot 1 Claimed"></v-checkbox>
        </v-flex>

        <v-flex xs6>
          <v-checkbox v-model="Robot2Claimed" label="Robot 2 Claimed"></v-checkbox>
        </v-flex>

        <v-flex xs6>
          <v-checkbox v-model="Robot1Parked" label="Robot 1 Parked"></v-checkbox>
        </v-flex>

        <v-flex xs6>
          <v-checkbox v-model="Robot2Parked" label="Robot 2 Parked"></v-checkbox>
        </v-flex>

        <!-- Can change counter to max digits of max num of scroing elements -->
        <!-- <v-text-field
          v-validate="'required|max:10'"
          v-model="LeftCargoHold"
          :counter="2"
          :error-messages="errors.collect('name')"
          label="Left Cargo Hold"
        ></v-text-field> -->
        <v-flex class="pa-3">
          <v-layout row wrap>
            <v-flex xs4 class="text-xs-center">
              Left Cargo Hold
            </v-flex>
            <v-flex xs8>
              <number-input v-model="AutonomousLeftCargoHold" center controls>
              </number-input>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex class="pa-3">
          <v-layout row wrap>
            <v-flex xs4 class="text-xs-center">
              Right Cargo Hold
            </v-flex>
            <v-flex xs8>
              <number-input v-model="AutonomousRightCargoHold" center controls>
              </number-input>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex class="pa-3">
          <v-layout row wrap>
            <v-flex xs4 class="text-xs-center">
              Minerals in Depot
            </v-flex>
            <v-flex xs8>
              <number-input v-model="AutonomousMineralsInDepot" center controls>
              </number-input>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-divider/>
      <v-layout row wrap>
        <v-flex xs12>
          <div> Driver-Controlled </div>
        </v-flex>

        <v-flex class="pa-3">
          <v-layout row wrap>
            <v-flex xs4 class="text-xs-center">
              Left Cargo Hold
            </v-flex>
            <v-flex xs8>
              <number-input v-model="DriverControledLeftCargoHold" center controls>
              </number-input>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex class="pa-3">
          <v-layout row wrap>
            <v-flex xs4 class="text-xs-center">
              Right Cargo Hold
            </v-flex>
            <v-flex xs8>
              <number-input v-model="DriverControledRightCargoHold" center controls>
              </number-input>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex class="pa-3">
          <v-layout row wrap>
            <v-flex xs4 class="text-xs-center">
              Minerals in Depot
            </v-flex>
            <v-flex xs8>
              <number-input v-model="DriverControledMineralsInDepot" center controls>
              </number-input>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

    </v-card>
    
</template>

<script>
import NumberInput from "@chenfengyuan/vue-number-input"

export default {
  data: () => ({
    Team1CheckNoShow: false,
    Team1CheckPresent: true,
    Team1CheckLatched: false,
    Team2CheckNoShow: false,
    Team2CheckPresent: true,
    Team2CheckLatched: false,
    Robot1Landed: false,
    Robot1Claimed: false,
    Robot2Landed: false,
    Robot2Claimed: false,
    AutonomousLeftCargoHold: 0,
    AutonomousRightCargoHold: 0,
    AutonomousMineralsInDepot: 0,
    DriverControledLeftCargoHold: 0,
    DriverControledRightCargoHold: 0,
    DriverControledMineralsInDepot: 0
  }),
  components:{NumberInput},
  props: ["color"]
};
</script>

<style>
</style>
