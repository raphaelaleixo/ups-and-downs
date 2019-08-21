<template>
  <form @submit.prevent="createNewGame"
    class="settings">
    <v-combobox
      v-model="newgame.numberOfPlayers"
      :items="players"
      label="Players"
    />
    <v-combobox
      v-model="newgame.base"
      :items="boardSizes"
      label="Board size"
    />
    <v-btn
      large
      color="primary">Play now</v-btn>
  </form>
</template>

<script>
  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';
  export default {
    data () {
      return {
        newgame: {
          numberOfPlayers: 2,
          base: {text:'Very small', value:6}
        },
        players: [2, 3, 4],
        boardSizes: [{text:'Very small', value:6}, {text:'Small', value: 7}, {text:'Medium', value: 8}, {text:'Large', value: 9}, {text:'Very large', value: 10}]
      }
    }
  }
</script>