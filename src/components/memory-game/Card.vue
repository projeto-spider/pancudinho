<template>
  <div class="Card" :class="classes">
    <div v-if="flip">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    flip: {
      type: Boolean,
      default: false,
    },

    content: {
      type: String,
      required: true,
    }
  },

  computed: {
    classes() {
      return {
        flipped: this.flip
      }
    }
  }
}
</script>

<style scoped>
.Card {
    display: inline-block;
    width: 3.3em;
    height: 4.6em;
    border: 1px solid #666;
    border-radius: .3em;
    padding: .25em;
    margin: 0 .5em .5em 0;
    text-align: center;
    font-size: 1.2em;
    font-weight: normal;
    font-family: Arial, sans-serif;
    position: relative;
    background-color: #003570;
    box-shadow: .2em .2em .5em #333;
}

.Card.flipped {
  background-color: #fff;
}
</style>
