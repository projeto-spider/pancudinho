<template>
  <div style='background-color: #7FFFD4' class="aligner">

    <img v-show='counter2==-1 || counter2==0 || counter2==1 || counter2==3' :src="Tutorial1"><br>
    <img v-show='counter2==2' :src="Tutorial2"><br>
    <img v-show='counter2>=4' :src="Tutorial3"><br>
    <div class='balloon'>
      <div class='text'>{{showText}}</div>
      <div class='text2' @click='handleClick()'>>></div>
    </div>

  </div>
</template>

<script>
import Panel from '../ui/Panel.vue'
import Tutorial1 from '../../assets/tutorial-balança.png'
import Tutorial2 from '../../assets/tutorial-balança-2.png'
import Tutorial3 from '../../assets/tutorial-balança-3.png'

export default {
  name: 'SeesawGame',

  components: {
    Panel
  },

  props: {
    finishTutorial: {
      type: Function,
      default: () => ({})
    }
  },

  data: () => ({
    Tutorial1,

    Tutorial2,

    Tutorial3,

    counter2: -1,

    showText: '',

    showTextDigitCount: 0,

    showTextInterval: 0,

    tutorial: [
      {
        text: 'Bem vindo ao jogo da balança!'
      },
      {
        text: 'Nesse jogo, seu objetivo é medir o peso do Pançudinho.'
      },
      {
        text: 'Mantendo o clique do mouse pressionado sobre a bigorna lado direito da balança, sua massa irá aumentar.'
      },
      {
        text: 'Caso solte o clique, essa massa irá diminuir novamente.'
      },
      {
        text: 'Para vencer, você precisa igualar a massa da bigorna e do Pançudinho por exatamente 3 segundos.'
      },
      {
        text: 'Está Pronto?'
      },
      {
        text: 'Vamos começar!'
      }
    ]
  }),

  created () {
    this.nextText()
  },

  methods: {
    handleClick () {
      if (this.tutorial[this.counter2].text === this.showText) {
        this.nextText()
      } else {
        this.skipWrittingText()
      }
    },

    nextText () {
      this.counter2++

      if (this.counter2 < this.tutorial.length) {
        this.showText = ''
        this.showTextDigitCount = 0

        this.showTextInterval = setInterval(() => {
          const nextChar = this.tutorial[this.counter2].text[this.showTextDigitCount++]

          if (!nextChar) {
            this.clearShowTextInterval()
          } else {
            this.showText += nextChar
          }
        }, 50)
      } else {
        this.finishTutorial()
      }
    },
    skipWrittingText () {
      this.clearShowTextInterval()
      this.showText = this.tutorial[this.counter2].text
    },
    clearShowTextInterval () {
      if (this.showTextInterval) {
        clearInterval(this.showTextInterval)
      }
    }
  }
}
</script>

<style scoped>
.aligner {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.ScenePanel {
  width: 90%;
  height: 90%;
}

.submit-button {
  float: right
}

.balloon{
  width: 800px;
  height: 100px;
  top: 400px;
  left: 250px;
  margin-top: 100px;
  padding: 0.1em 1em;
  position: absolute;
  background: #FFD700;
  border-radius: 5px;
  text-align: flex-start;
  color: rgb(245, 245, 245);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

.text {
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  color: black;
}

.text2 {
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  color: black;
  position: fixed;
  left: 1000px;
  top: 550px;
}

</style>
