<template>
  <div>
    <div class="board board--base" :style="gridStyle">
      <game-board-square
        :square="square"
        v-for="square in game.board.squares"
        :key="'square-' + square.number"
      />
    </div>
    <transition-group
      name="move-piece"
      tag="div"
      class="board"
      :style="gridStyle"
    >
      <game-board-piece
        v-for="player in game.players"
        :key="'player-' + player.number"
        :color="defs.playerColors[player.number - 1]"
        :style="{
          'grid-area': 'square' + player.position,
          'transition-duration': defs.transitionTime + 'ms'
        }"
        :player="player"
      />
    </transition-group>
  </div>
</template>

<script>
import GameBoardSquare from "@/components/GameBoardSquare";
import GameBoardPiece from "@/components/GameBoardPiece";
export default {
  name: "board",
  props: {
    game: Object,
    defs: Object
  },
  components: {
    GameBoardSquare,
    GameBoardPiece
  },
  computed: {
    boardGrid() {
      let grid = "";
      let base = parseInt(this.game.base);
      for (let i = this.game.base - 1; i >= 0; i--) {
        let boardRow = '"';
        if (i % 2 === 0) {
          for (let k = i * base + 1; k < base * i + base + 1; k++) {
            boardRow += " square" + k;
          }
          boardRow += '"';
        } else {
          for (let k = base * i + base; k > i * base; k--) {
            boardRow += " square" + k;
          }
          boardRow += '"';
        }
        grid += boardRow;
      }
      return grid;
    },
    gridStyle() {
      return {
        "grid-template-areas": this.boardGrid,
        "grid-template-columns": `repeat(${this.game.base},1fr)`,
        "grid-template-rows": `repeat(${this.game.base},1fr)`
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.board {
  height: 100%;
  width: 100%;
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 3px;
  border: 2px solid darken(#ffed66, 25%);
  grid-template: auto / auto;
  &:not(.board--base) {
    pointer-events: none;
  }
}
</style>
