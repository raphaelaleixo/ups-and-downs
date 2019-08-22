<template>
  <form @submit.prevent="createNewGame" class="settings">
    <v-row>
      <v-col cols="12" md="6">
        <v-combobox
          v-model="numberOfPlayers"
          :items="players"
          label="Players"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-combobox v-model="base" :items="boardSizes" label="Board size" />
      </v-col>
      <v-col>
        <v-btn type="submit" large color="primary">Play now</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      numberOfPlayers: {},
      base: {},
      players: [
        { text: "Two Players", value: 2 },
        { text: "Three players", value: 3 },
        { text: "Four players", value: 4 }
      ],
      boardSizes: [
        { text: "Very small", value: 6 },
        { text: "Small", value: 7 },
        { text: "Medium", value: 8 },
        { text: "Large", value: 9 },
        { text: "Very large", value: 10 }
      ]
    };
  },
  computed: {
    ...mapState(["game"]),
    newgame() {
      return {
        numberOfPlayers: this.numberOfPlayers.value,
        base: this.base.value
      };
    }
  },
  methods: {
    ...mapActions(["addGame"]),
    async createNewGame() {
      await this.addGame(this.newgame);
      this.$router.push("/game/" + this.game.gameId);
    }
  },
  created() {
    this.base = this.boardSizes[0];
    this.numberOfPlayers = this.players[0];
  }
};
</script>
