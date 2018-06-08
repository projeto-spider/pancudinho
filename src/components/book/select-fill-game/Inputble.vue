<template>
  <div>
    <input ref="inp" type="" :value="value" @input="updateGivenAnswer($event.target.value)">
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Inputble',

  props: ['value', 'correctanswer', 'revealAnswers', 'handleWord'],

  computed: {
    computedClasses () {
      const valid = this.answer && this.correctAnswers.includes(this.answer)
      return {
        valid: this.revealAnswers && valid,
        invalid: this.revealAnswers && !valid
      }
    }
  },

  data: () => ({
    answer: null
  }),

  methods: {
    updateGivenAnswer (answer) {
      this.answer = answer
      this.handleAnswered()
    },

    handleAnswered () {
      this.handleWord(this.answer)
    }
  }
}
</script>

<style type="text/css" scoped>
input{
  padding: 0.2em 0.1em;
  margin: 0.2em 0.2em;
  width:266px;
  background: #ffffff;
  border-radius: 5px;
  text-align: center;
  font: 40 35px/0.1 'Arizonia', Helvetica, sans-serif;
  color: #2b2b2b;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}
.valid{
  background-color:#12f51963;
}
.invalid{
  background-color:#f5121263;
}
</style>
