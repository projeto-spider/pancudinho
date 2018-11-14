<template>
  <div class="book">
    <div v-for="option in options" :key="option.id">
        <div v-if="fixed">
          <inputble
            v-model="typed"
            :correct-answers="correctAnswers"
            :reveal-answers="revealAnswer"
            :handle-word="answer => verifyAnswer(option.id, answer)"
          ></inputble>
        </div>
        <div v-if="option.isAnswer && !option.right && !option.wrong">
          <input v-model="option.typedAnswer">
        </div>
        <div v-if="option.isAnswer && option.right">
          <input style="background-color:#12f51963;" v-model="option.typedAnswer">
        </div>
        <div v-if="option.isAnswer && option.wrong">
          <input style="background-color:#f5121263;" v-model="option.typedAnswer">
        </div>
        <div v-if="!option.isAnswer">
          <span class="fairy-letter">{{option.text}}</span>
        </div>
    </div>
    <div style="text-align:center;">
      <div v-if="revealAnswer">
        <Button :handle-click="closeGame" :label="'Continue'"></button><br>
      </div>
      <template v-else>
        <Button :handle-click="doAgain" :label="'Reset'"></Button><br>
        <Button :handle-click="checkAnswers" :label="'Submit'"></Button>
      </template>
    </div>
  </div>
</template>

<script>
import Inputble from './Inputble.vue'
import Button from '../../ui/Button.vue'

export default {
  components: {Inputble, Button},

  created () {
    this.items = this.options
      .filter(item => item.isAnswer)

    this.answers = this.items
      .reduce((acc, option) => {
        acc[option.id] = null
        return acc
      }, {})
  },

  props: {
    state: {
      type: Object,
      required: true
    }
  },

  computed: {
    correctAnswers () {
      return Object.entries(this.answers)
        .filter(([id, option]) => option && option[1] && option[1].id === parseInt(id, 10))
        .map(([_, option]) => option[0])
    }
  },

  data: () => ({
    items: [],
    correctAnswer: [],
    revealAnswer: false,
    typed: '',
    answers: {},
    fixed: false,
    options: [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet, est nullam discere intellegam ne, pro ne alterum facilisi, tibique deseruisse id per. Moderatius'
      },
      {
        id: 2,
        text: 'lorem',
        isAnswer: true,
        typedAnswer: '',
        right: false,
        wrong: false
      },
      {
        id: 3,
        text: 'reprehendunt has eu. Aperiri definitiones conclusionemque vix eu, atqui velit pertinacia no his,'
      },
      {
        id: 4,
        text: 'ipsum',
        isAnswer: true,
        typedAnswer: '',
        right: false,
        wrong: false
      },
      {
        id: 5,
        text: 'Curabitur feugiat sed ligula ac tempor. Ut id facilisis massa. Mauris pretium lacus sem, et scelerisque dui euismod'
      },
      {
        id: 6,
        text: 'vehicula',
        isAnswer: true,
        typedAnswer: '',
        right: false,
        wrong: false
      }
    ]
  }),

  methods: {
    checkAnswers () {
      this.revealAnswer = true
      for (var i = 1; i < this.options.length; i += 2) {
        if (this.options[i].typedAnswer.toLowerCase() === this.options[i].text) {
          this.options[i].right = true
          this.options[i].wrong = false
        } else {
          this.options[i].right = false
          this.options[i].wrong = true
        }
      }
    },

    doAgain () {
      for (var i = 1; i < this.options.length; i += 2) {
        this.options[i].typedAnswer = ''
        this.options[i].right = false
        this.options[i].wrong = false
      }
    },

    submit () {
      this.revealAnswer = true
    },

    verifyAnswer (id, answer) {
      answer = answer.toLowerCase()
      var obj = this.items.filter(e => e.text === answer)
      this.answers[id] = [answer, obj[0]]
    },

    closeGame () {
      this.state.closeGame()
    }
  }
}
</script>

<style scoped>
.book {
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
input {
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
</style>
