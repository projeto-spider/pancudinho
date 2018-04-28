<template>
<div>
  <div class="VerificationSystem">
    <button class="box submit" @click="(again())">Again</button>
    <input v-if="talkList[0].correct==false && talkList[0].wrong==false" v-model="Answer" class="text normal">
    <input v-if="talkList[0].correct==true" v-model="Answer" class="text correct">
    <input v-if="talkList[0].wrong==true" v-model="Answer" class="text wrong">
    <button class="box submit" @click="(verification())">Submit</button>

  </div>
</div>
</template>

<script type="text/javascript">

export default {
  name: 'VerificationSystem',

  props: {
    AnswerCorrect: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({ // coloquei lista caso for necessário, mas só a primeira posição é funcional (só tem um input habilitado)
    correct: false,
    wrong: false,
    Answer: '',
    talkList: [
      {
        talk: 'lorem',
        correct: false,
        wrong: false,
        Answer: 'lorem'
      },
      {
        talk: 'Ipsum',
        correct: false,
        wrong: false,
        Answer: ''
      },
      {
        talk: 'lalala',
        correct: false,
        wrong: false,
        Answer: 'sada'
      }
    ]
  }),

  methods: {
    verification () {
      for (var i = 0; i < this.talkList.length; i ++) {
        if (this.talkList[i].talk === this.Answer.toLowerCase()) { // ou talkList[i].Answer
          this.talkList[i].correct = true
          this.talkList[i].wrong = false
        } else {
          this.talkList[i].correct = false
          this.talkList[i].wrong = true
        }
      }
    },
    again () {
      for (var i = 0;i < this.talkList.length ; i ++) {
        this.talkList[i].correct = false
        this.talkList[i].wrong = false
        this.Answer = ''
      }
    }
  }
}
</script>

<style>
.text.normal{
  padding: 0.2em 0.1em;
  margin: 0.2em 0.2em;
  width:266px;
  background: #ffffff;
  border-radius: 500px;
  text-align: center;
  font: 40 35px/0.1 'Arizonia', Helvetica, sans-serif;
  color: #000000;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
}
.text.correct{
  padding: 0.2em 0.1em;
  margin: 0.2em 0.2em;
  width:266px;
  background: #1fdd0e;
  border-radius: 500px;
  text-align: center;
  font: 40 35px/0.1 'Arizonia', Helvetica, sans-serif;
  color: #f3eaea;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
}
.text.wrong{
  padding: 0.2em 0.1em;
  margin: 0.2em 0.2em;
  width:266px;
  background: #d41919;
  border-radius: 500px;
  text-align: center;
  font: 40 35px/0.1 'Arizonia', Helvetica, sans-serif;
  color: #ffffff;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
}

.box.submit{
  width: 100px;
  border-radius: 15px;
  background: rgb(237, 180, 247);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 400 30px/0.8 'Arizonia', Helvetica, sans-serif;
  font: 13px 'Arizonia', Helvetica, sans-serif;
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 0.7em 2em;
  margin: 0.7em 0.4em;
  text-align: center
}

</style>
