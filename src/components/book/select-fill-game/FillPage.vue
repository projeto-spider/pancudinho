<template>
  <div class="book">
    <div v-for="option in options" :key="option.id">
        <div v-if="option.isAnswer">
          <inputble
            v-model="option.typed"
            :correctAnswer="correctAnswer"
            :revealAnswer="revealAnswer"
            :handle-word="answer => verifyAnswer(answer)"
            :id="option.id"
          ></inputble>
        </div>
        <div v-else>
          <div class="fairy-letter">{{option.text}}</div>
        </div>
    </div>
    <p style="text-align:center;">
      <button @click="doAgain">Reset</button><br>
      <button @click="submit">Submit</button>
    </p>
  </div>
</template>

<script>
import Inputble from './Inputble.vue'
export default {
  components: {Inputble},

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
    correctAnswers () {
      return Object.entries(this.answers)
        .filter(([id, option]) => option && option.id === parseInt(id, 10))
        .map(([_, option]) => option)
    }
  },

  data: () => ({
    items: [],
    correctAnswer: [],
    revealAnswer: false,
    answers: {},
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
    ]
  }),

  methods: {
    checkAnswers () {
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].typed === this.options[i].words) {
          this.options[i].right = true
          this.options[i].wrong = false
        } else {
          this.options[i].right = false
          this.options[i].wrong = true
        }
      }
    },
    doAgain () {
      for (var i = 0; i < this.options.length; i++) {
        this.options[i].typed = ''
        this.options[i].right = false
        this.options[i].wrong = false
      }
    },

    submit () {
      this.revealAnswer = true
      console.log(this.items)
    },

    verifyAnswer (option, answer) {
      this.answer[option.id] = answer
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
.right{
  background-color:#12f51963;
}
.wrong{
  background-color:#f5121263;
}

</style>
