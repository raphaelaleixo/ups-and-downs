<template>
  <controls v-if="game.players" :game="game" :defs="defs"></controls>
</template>

<script>
import Controls from "@/components/Controls";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "player",
  components: {
    Controls
  },
  computed: {
    ...mapState(["game", "defs"])
  },
  methods: {
    ...mapActions(["loadGame"])
  },
  async mounted() {
    if (!this.game.gameId) {
      const gameId = this.$route.params.id;
      await this.loadGame(gameId);
    }
  }
};
</script>
