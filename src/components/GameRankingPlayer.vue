<template>
  <v-list-item>
    <v-list-item-avatar :color="playerColor">
      <v-icon color="white">mdi-emoticon-happy</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="'Player ' + player.number" />
      <v-list-item-subtitle v-text="url" />
    </v-list-item-content>

    <v-list-item-action v-if="isOnline">
      <v-icon color="green lighten-1">mdi-access-point</v-icon>
    </v-list-item-action>
    <v-list-item-action>
      <v-btn icon :href="url">
        <v-icon color="grey lighten-1">mdi-link</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    player: Object,
    playerColor: String
  },
  computed: {
    isOnline() {
      return this.player.status && this.player.status === "online";
    },
    url() {
      return (
        window.location.protocol +
        "//" +
        window.location.hostname +
        this.port +
        "/game/" +
        this.$route.params.id +
        "/" +
        this.player.number
      );
    },
    port() {
      return +window.location.port ? ":" + window.location.port : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.ranking__item {
  transition: all 1s;
  padding: 0.5em 1em;
  background: #fff;
  margin: 1em 0;
  border-radius: 8px;
  box-shadow: 0 0 0.25em 0 #00000010;
}
.player__name {
  font-weight: bolder;
  position: relative;
  padding-left: 1em;
  line-height: 1;
}
.player__url {
  color: inherit;
  font-size: 0.875em;
}
.player__status {
  width: 0.5em;
  height: 0.5em;
  left: 0;
  top: 0.25em;
  position: absolute;
  background: #ff5e5b;
  border-radius: 50%;
  &.player__status--online {
    background: #7fb800;
  }
}
</style>
