<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="12" md="3">
        <game-ranking :game="game" :defs="defs" v-if="game.players" />
      </v-col>
      <v-col cols="12" md="5">
        <v-card>
          <v-responsive :aspect-ratio="1 / 1">
            <game-board v-if="game.board" :game="game" :defs="defs" />
          </v-responsive>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <game-dice :game="game"
          :defs="defs"
        v-if="game.dice" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GameBoard from "@/components/GameBoard";
import GameRanking from "@/components/GameRanking";
import GameDice from '@/components/GameDice';
import rules from "@/api/rules";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "game",
  components: {
    GameBoard,
    GameDice,
    GameRanking
  },
  watch: {
    game: function(state) {
      if (state.serverUpdate && state.dice.locked === true) {
        setTimeout(() => {
          rules.playTurn(
            { state, defs: this.defs },
            this.actualPlayer,
            this.setLocalGame,
            this.updateGame
          );
        }, this.defs.dice.rotations * this.defs.dice.timing);
      }
    }
  },
  computed: {
    ...mapState(["game", "defs"]),
    actualPlayer() {
      return this.game.turn % this.game.numberOfPlayers;
    }
  },
  methods: {
    ...mapActions(["loadGame", "setLocalGame", "updateGame"])
  },
  async mounted() {
    if (!this.game.gameId) {
      const gameId = this.$route.params.id;
      await this.loadGame(gameId);
    }
  }
};
</script>
<style lang="scss" scoped>
.game {
  display: contents;
}
.game__main {
  grid-area: main;
  display: flex;
  align-items: flex-start;
}
.game__board {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}
</style>
