<template>
  <div v-show="open" class="rewards-modal-overlay">
    <div class="rewards-modal">
      <div class="star-ratings-sprite">
        <span
          :style="`width: ${percentage}%`"
          class="star-ratings-sprite-rating"
        ></span>
      </div>

      <Button
        color="blue"
        class="continue-btn"
        :handleClick="onContinue"
      >Continuar</Button>
    </div>

    <audio preload="auto" autoplay="false" :src="CongratulationsOgg"></audio>
  </div>
</template>

<script>
import Button from './Button.vue'
import CongratulationsOgg from '../../assets/audio/congratulations_male.ogg'

export default {
  name: 'Rewards',

  components: { Button },

  props: {
    open: {
      type: Boolean,
      default: false
    },

    realPercentage: {
      type: Number,
      default: 0
    },

    onContinue: {
      type: Function,
      default: () => {}
    }
  },

  data: () => ({
    CongratulationsOgg,

    percentage: 0
  }),

  created () {
    this.startFillingStars()
  },

  watch: {
    open () {
      if (!this.open) {
        this.percentage = 0
        return
      }

      this.startFillingStars()
    }
  },

  methods: {
    startFillingStars () {
      const increaseRate = 1
      const increaseInterval = 10

      const interval = setInterval(() => {
        if (this.percentage >= this.realPercentage) {
          this.playCongratulations()
          return clearInterval(interval)
        }

        const increase = Math.min(increaseRate, this.realPercentage - this.percentage)

        this.percentage += increase
      }, increaseInterval)
    },

    playCongratulations () {
      const audio = new Audio(this.CongratulationsOgg)
      audio.play()
    }
  }
}
</script>

<style>
.rewards-modal-overlay {
  z-index: 1000;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
}

.rewards-modal {
  width: 640px;
  height: 320px;
  background-color: white;
  border: 1px solid #000;
  justify-self: center;
  align-self: center;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center
}

.star-ratings-css {
  unicode-bidi: bidi-override;
  color: #c5c5c5;
  font-size: 25px;
  height: 25px;
  width: 100px;
  margin: 0 auto;
  position: relative;
  padding: 0;
  text-shadow: 0px 1px 0 #a2a2a2;
}
.star-ratings-css-top {
  color: #e7711b;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: block;
  top: 0;
  left: 0;
  overflow: hidden;
}
.star-ratings-css-bottom {
  padding: 0;
  display: block;
  z-index: 0;
}
.star-ratings-sprite {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2605/star-rating-sprite.png") repeat-x;
  font-size: 0;
  height: 21px;
  line-height: 0;
  overflow: hidden;
  text-indent: -999em;
  width: 110px;
  margin: 0 auto;
}
.star-ratings-sprite-rating {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2605/star-rating-sprite.png") repeat-x;
  background-position: 0 100%;
  float: left;
  height: 21px;
  display: block;
}
.continue-btn {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
