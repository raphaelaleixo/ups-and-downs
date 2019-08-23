<template>
  <v-card>
    <v-list two-line>
      <game-ranking-player
        v-for="player in playerRanking"
        :player="player"
        :playerColor="defs.playerColors[player.number - 1]"
        :key="player.number"
      />
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import GameRankingPlayer from "@/components/GameRankingPlayer";
export default {
  components: {
    GameRankingPlayer
  },
  props: {
    game: Object,
    defs: Object
  },
  computed: {
    ...mapGetters(["playerRanking", "actualPlayer"])
  }
};
</script>

<style lang="scss" scoped>
.ranking__title {
  margin: 0;
}
</style>
