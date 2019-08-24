<template>
  <div
    class="board__square square"
    :class="'square--' + square.type"
    :style="{ 'grid-area': 'square' + square.number }"
  >
    <v-icon color="#ffffff80" class="square__icon" x-large v-if="icon">{{
      icon
    }}</v-icon>
    <span v-if="!square.to && square.type !== 'goal'" class="square__number">{{
      square.number
    }}</span>
    <span v-if="square.to" class="square__number square__to">{{
      square.to
    }}</span>
  </div>
</template>

<script>
export default {
  props: {
    square: Object
  },
  computed: {
    icon() {
      if (this.square.type === "higher") {
        return "mdi-arrow-up-bold";
      } else if (this.square.type === "lower") {
        return "mdi-arrow-down-bold";
      } else if (this.square.type === "goal") {
        return "mdi-flag-checkered";
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin square($color) {
  background-color: $color;
  color: darken($color, 50%);

  &:nth-child(even):not(.square--goal) {
    background-color: rgba($color, 0.7);
  }
}
.board__square {
  padding: 0;
  font-size: 0.8em;
  font-weight: bolder;
  text-transform: uppercase;
  position: relative;
  letter-spacing: -1px;
  overflow: hidden;
  height: 0;
  padding-bottom: 100%;
  box-shadow: inset 0 0 0 2px darken(#ffed66, 25%);
  @include square(#ffed66);
}
.square--higher {
  @include square(#00cecb);
}
.square--lower {
  @include square(#ff5e5b);
}
.square__number {
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  word-break: normal;
}
.square--goal {
  background: darken(#e6cb00, 10%);
  .square__number {
    top: 50%;
    left: 50%;
    font-size: 1.25em;
    transform: translate(-50%, -50%);
  }
}
.square__icon {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 2em;
  transform: translate(-50%, -50%);
  &:before {
    font-size: 1em;
  }
}
.square__to {
  color: darken(#00cecb, 20%);
  font-size: 1.5em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.square--lower .square__to {
  color: darken(#ff5e5b, 40%);
}
</style>
