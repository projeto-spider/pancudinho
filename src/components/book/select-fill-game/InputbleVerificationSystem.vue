<template>
<div class='InputbleVerificationSystem'>
  <div v-if="(!right) && (!wrong)"><input v-model="typed"></div>
  <div v-if="right"><input v-model="typed" class="correctAnswer"></div>
  <div v-if="wrong"><input v-model="typed" class="wrongAnswer"></div>
  <br>
  <button @click="verifyAnswers()"> SUBMIT </button>
</div>
</template>

<script>
import Inputble from './Inputble.vue'
export default {
  name: 'InputbleVerificationSystem',
  components: {Inputble},
  data: () => ({
    answer: 'lorem',
    right: false,
    wrong: false,
    typed: ''
  }),
  methods: {
    verifyAnswers(){
      if (this.answer==this.typed.toLowerCase()){
        this.right=true
        this.wrong=false
      }else{
        this.wrong=true
        this.right=false
      }
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
.correctAnswer {
 background-color: #12f51963
}
.wrongAnswer {
 background-color: #f5121263
}
</style>
