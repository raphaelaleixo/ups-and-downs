<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h2 class="display-1">A Realtime, Multiplayer Boardgame!</h2>
        <p class="subtitle-1 mb-4">
          Select the number of players, the size of your game board and start
          playing now!
        </p>
        <game-settings />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GameSettings from "@/components/GameSettings";
export default {
  components: {
    GameSettings
  }
};
</script>
