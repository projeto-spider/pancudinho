<template>
  <div class="book">
    <div v-for="option in options" :key="option.id">
      <div v-if="!option.isAnswer">
        <span class="fairy-letter">{{option.text}}</span>
      </div>
      <div v-else>
        <Selectable
          :handle-answered="answer => verifyAnswer(option.id, answer)"
          :options="items"
          :reveal-answers="revealAnswers"
          :correct-answers="correctAnswers"
        ></Selectable>
      </div>
    </div>
    <p style="text-align:center;">
      <button @click="doAgain">Reset</button><br>
      <button @click="submit">Submit</button>
    </p>
  </div>
</template>

<script>
import Selectable from './Selectable.vue'
export default {
  name: 'SelectPage',

  components: {Selectable},

  created () {
    this.items = this.options
      .filter(item => item.isAnswer)
      .sort(() => Math.random() - Math.random())

    this.answers = this.items
      .reduce((acc, option) => {
        acc[option.id] = null
        return acc
      }, {})
  },

  computed: {
    correctAswers () {
      return Object.entries(this.answers)
        .filter(([id, option]) => option && option.id === parseInt(id, 10))
        .map(([_, option]) => option.id)
    }
  },

  data: () => ({
    answers: {},
    revealAnswers: false,
    items: [],
    options: [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet, est nullam discere intellegam ne, pro ne alterum facilisi, tibique deseruisse id per. Moderatius'
      },
      {
        id: 2,
        text: 'lorem',
        isAnswer: true
      },
      {
        id: 3,
        text: 'reprehendunt has eu. Aperiri definitiones conclusionemque vix eu, atqui velit pertinacia no his,'
      },
      {
        id: 4,
        text: 'ipsum',
        isAnswer: true
      },
      {
        id: 5,
        text: 'Curabitur feugiat sed ligula ac tempor. Ut id facilisis massa. Mauris pretium lacus sem, et scelerisque dui euismod'
      },
      {
        id: 6,
        text: 'vehicula',
        isAnswer: true
      }
    ],
    defocus: false
  }),

  props: {
    selected:{
      type: Boolean,
      default: false
    }
  },

  methods: {
    doAgain () {
      /*for (var i = 0; i < this.options.length; i++) {
        this.options[i].word_lac = ''
        this.options[i].select_ver = false
        this.words[i].select = false
        this.options[i].right = false
        this.options[i].wrong = false
      }*/
      this.revealAnswers=false
      this.selected=false
    },

    verifyAnswer (id, answer) {
      this.answers[id] = answer
    },

    submit () {
      this.revealAnswers = true
    }
  }
}
</script>

<style scoped>
.book{
  padding: 5em 3em 3em 3em;
  margin: 1em 5em;
  border-radius: 3px;
  text-align: left;
  background: #fff6d1; /*Alternative color: #f3eded*/
  box-shadow: .2em .2em .5em #333
}
.fairy-letter {
  font: 400 22.5px/1.3 'Arizonia', Helvetica, sans-serif;
  color: #2b2b2b;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}
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

.box {

  background: #e2dfdf;
  border-radius: 5px;
  opacity: 0.5;
  display: block;
  padding: 20px 110px;
  margin: 0;
  font: 40 35px/0.1 'Arizonia', Helvetica, sans-serif;
  color: black;
  text-align: center;
  height: 60px;

}

.right {

  background-color:#12f51963;
  border-radius: 5px;
  opacity: 0.5;
  display: block;
  padding: 20px 110px;
  height: 60px;
  margin: 0;
  font: 40 35px/0.1 'Arizonia', Helvetica, sans-serif;
  color: black;
  text-align: center;

}
.false {

  background-color:#f5121263;
  border-radius: 5px;
  opacity: 0.5;
  display: block;
  padding: 20px 110px;
  margin: 0;
  height: 60px;
  font: 40 35px/0.1 'Arizonia', Helvetica, sans-serif;
  color: black;
  text-align: center;

}
.option {
  padding: 1em 2em;
  margin: 2px 1px;
  margin-top: 50px;
  width: 175px;
  margin-left: 125px;
  background: plum;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 400 23px/1.3 'Arizonia', Helvetica, sans-serif;
  font-weight: bold;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
  color: black;
  float:left;
  text-align: center;
}

.defocus {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  background-color: rgba(0, 0, 0, .4);
  display: table;
  transition: opacity .3s ease;
}
</style>
