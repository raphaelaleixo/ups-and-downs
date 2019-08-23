<template>
  <v-card>
    <v-card-title>{{ gameInfo }}</v-card-title>
    <v-card-text class="d-flex flex-wrap">
      <div v-if="game.dice.locked === false">Waiting for the dice roll...</div>
      <div v-else>The dice were rolled!</div>
      <div class="dice__wrapper">
        <game-dice-die
          :die="game.dice.dice1"
          :turn="game.dice.locked"
          :defs="defs.dice"
        />
        <game-dice-die
          :die="game.dice.dice2"
          :defs="defs.dice"
          :turn="game.dice.locked"
        />
      </div>
    </v-card-text>
    <v-progress-linear
      v-if="game.dice.locked === false"
      absolute
      bottom
      indeterminate
      :color="defs.playerColors[actualPlayer -1]"
    ></v-progress-linear>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import GameDiceDie from "@/components/GameDiceDie";
export default {
  components: {
    GameDiceDie
  },
  props: {
    game: Object,
    defs: Object
  },
  computed: {
    ...mapGetters(["playerRanking", "actualPlayer"]),
    gameInfo() {
      if (this.game.winner) {
        return `Player ${this.game.winner} won the game!`;
      } else {
        return `It's Player ${this.actualPlayer}'s turn!`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dice__wrapper {
  width: 100%;
  flex-basis: 1 0 auto;
  margin: 1em 0;
  display: flex;
  perspective: 99999px;
}
</style>
