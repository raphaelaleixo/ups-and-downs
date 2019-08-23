<template>
  <div
    class="dice"
    :style="{ 'transition-duration': defs.timing + 'ms' }"
    :class="'dice--face-' + faceValue"
  >
    <div class="dice__face" v-for="face in 6" :key="face">
      <v-icon color="#e6cb00">{{ "mdi-dice-" + face }}</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defs: Object,
    die: Number,
    turn: Boolean
  },
  data() {
    return {
      faceValue: this.die
    };
  },
  watch: {
    turn(newValue) {
      if (newValue === true) {
        let revolutions = this.defs.rotations;
        const spin = () => {
          revolutions--;
          if (revolutions > 0) {
            this.faceValue = Math.floor(Math.random() * 6) + 1;
            setTimeout(spin, this.defs.timing);
          } else {
            setTimeout(() => {
              this.faceValue = this.die;
            });
          }
        };
        spin();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dice {
  height: 3em;
  width: 3em;
  margin: 0 1em 0 0;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.2s linear;
  &.dice--face-1 {
    transform: rotateY(360deg) !important;
  }
  &.dice--face-2 {
    transform: rotateY(-90deg) !important;
  }
  &.dice--face-3 {
    transform: rotateY(180deg) !important;
  }
  &.dice--face-4 {
    transform: rotateY(90deg) !important;
  }
  &.dice--face-5 {
    transform: rotateX(-90deg) !important;
  }
  &.dice--face-6 {
    transform: rotateX(90deg) !important;
  }
}
.dice__face {
  position: absolute;
  width: 3em;
  height: 3em;
  padding: 0.5em;
  text-align: center;
  line-height: 3em;
  border-radius: 10px;
  border: 1px solid #e6cb00;
  backface-visibility: hidden;
  &:nth-child(1) {
    transform: rotateY(0deg) translateZ(1.5em);
  }
  &:nth-child(2) {
    transform: rotateY(90deg) translateZ(1.5em);
  }
  &:nth-child(3) {
    transform: rotateY(180deg) translateZ(1.5em);
  }
  &:nth-child(4) {
    transform: rotateY(-90deg) translateZ(1.5em);
  }
  &:nth-child(5) {
    transform: rotateX(90deg) translateZ(1.5em);
  }
  &:nth-child(6) {
    transform: rotateX(-90deg) translateZ(1.5em);
  }
}

.v-icon {
  font-size: 4em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dice__dot {
  width: 0.55em;
  height: 0.55em;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  box-shadow: inset 0 -1px 0 0px darken(#e6cb00, 20%);
}
</style>
