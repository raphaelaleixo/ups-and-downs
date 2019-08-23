<template>
  <v-card dark :color="myColor" class="my-5 mx-auto" width="30em">
    <v-card-title>Player {{ activePlayer }}</v-card-title>
    <v-card-text v-if="this.actualPlayer == this.activePlayer">It's your turn!</v-card-text>
    <v-card-text v-else>It's Player {{ actualPlayer }}'s turn</v-card-text>
    <v-card-actions>
      <v-btn
        class="ma-2"
        @click="rollDice"
        outlined
        color="#ffffff"
        dark
        :disabled="!isMyTurn"
      >
        <v-icon left>mdi-dice-multiple</v-icon>
        Roll dice!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  props: {
    game: Object,
    defs: Object
  },
  data() {
    return {
      activePlayer: ""
    };
  },
  computed: {
    ...mapGetters(["playerRanking", "actualPlayer"]),
    isMyTurn() {
      return (
        this.actualPlayer == this.activePlayer &&
        this.game.dice.locked === false
      );
    },
    myColor() {
      return this.defs.playerColors[this.activePlayer - 1];
    }
  },
  methods: {
    ...mapActions(["updateDice", "updatePlayerStatus"]),
    rollDice() {
      this.updateDice({
        ...this.game,
        dice: {
          dice1: Math.floor(Math.random() * 6) + 1,
          dice2: Math.floor(Math.random() * 6) + 1,
          locked: true
        }
      });
    }
  },
  created() {
    this.activePlayer = this.$route.params.player;
    this.updatePlayerStatus({ game: this.game, player: this.activePlayer });
  }
};
</script>
