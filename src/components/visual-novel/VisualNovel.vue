<template>
  <Panel>
    <div v-for="(scene, index) in scenes" :key="scene.id" v-show="index === counter">
      <div>
        <img :src="images[index]">
      </div>

      <div
        class='text'
        :class="{ 'text-fix': [0, 5, 8, 9, 10, 11].includes(index) }"
      >
        {{ showText }}
      </div>
    </div>
    <div v-if='!showButton' class='btn' @click="nextText()">>></div>
  </Panel>

</template>

<script>
import Panel from '../ui/Panel.vue'

export default {
  components: {Panel},
  data: () => ({
    scenes: [
      {
        text: 'Olá, eu sou Pançudinho.',
        image: 'Quadro1.jpg',
        showText: ''
      },
      {
        text: 'Eu sei que a minha estética está ótima do jeito que está.',
        image: 'Quadro2.jpg'
      },
      {
        text: 'Mas notei que tenho me alimentado de um jeito bem deprimente.',
        image: 'Quadro3.jpg'
      },
      {
        text: 'Então decidi que a partir de hoje minha vida vai mudar.',
        image: 'Quadro4.jpg'
      },
      {
        text: 'Com alimentação saudável e exercícios físicos. Mas preciso de ajuda para isso.',
        image: 'Quadro5.jpg'
      },
      {
        text: 'Venha comigo se você quiser viver. Eu sou O TREINADOR.',
        image: 'Quadro6.jpg'
      },
      {
        text: 'Mas não é um caminho tão fácil como você pensa. Existem conceitos obscuros que você não conhece...',
        image: 'Quadro7.jpg'
      },
      {
        text: 'Mas como eu sou muito bondoso, eu posso ensinar para você.',
        image: 'Quadro8.jpg'
      },
      {
        text: 'Primeiro, temos que aprender a trabalhar com medidas, pois elas são essenciais para o nosso progresso.',
        image: 'Quadro9.jpg'
      },
      {
        text: 'Então, te apresento a medição. Com ela, nós vamos coletar, armazenar e relatar dados para que...',
        image: 'Quadro10.jpg'
      },
      {
        text: 'P: Balela isso! \n T: Como é?',
        image: 'Quadro11.jpg'
      },
      {
        text: 'P: Sei que você só ta fazendo isso pra levar meu dinheiro!',
        image: 'Quadro12.jpg'
      },
      {
        text: 'Mas quando falo que vou te ajudar, eu não tô mentindo.',
        image: 'Quadro13.jpg'
      },
      {
        text: 'Com a medição, você pode tomar decisões mais precisas e evidenciar melhor os pontos que quer melhorar.',
        image: 'Quadro14.jpg'
      },
      {
        text: 'P: Ok, ok...vamos ver o que você pode fazer \n T: Boa, garoto!',
        image: 'Quadro15.jpg'
      },
      {
        text: 'Agora, VAMOS COMEÇAR ESSA JORNADA!',
        image: 'Quadro16.jpg'
      }
    ],
    counter: -1,
    showText: '',
    showTextDigitCount: 0,
    showTextInterval: null,
    images: []
  }),

  created () {
    this.images = this.scenes.map(scene => {
      return require(`../../assets/${scene.image}`)
    })

    this.nextText()
  },

  computed: {
    currentScene () {
      return this.scenes[this.counter]
    }
  },

  methods: {
    nextText () {
      this.counter++

      if (this.showTextInterval) {
        clearInterval(this.showTextInterval)
      }

      if (this.counter === this.scenes.length) {
        this.state.closeGame()
      }

      this.showText = ''
      this.showTextDigitCount = 0

      this.showTextInterval = setInterval(() => {
        const nextChar = this.currentScene.text[this.showTextDigitCount++]

        if (!nextChar) {
          return clearInterval(this.showTextInterval)
        }

        this.showText += nextChar
      }, 50)
    }
  }
}

</script>

<style scoped>
.next{
  width: 100px;
  border: none;
  margin-top:0.1px;
  margin-left: 670px;
  text-align: center;
  background: #70a1ff;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.0);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
  font: 400 30px/1.3 'Arizonia', Helvetica, sans-serif;
}

.box.balloon{
  width: 800px;
  height: 100px;
  margin-top: 50px;
  padding: 0.2em 2em;
  background: #70a1ff;
  border-radius: 5px;
  text-align: left;
  color: rgb(245, 245, 245);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

.text {
  color: black;
  position: absolute;
  margin-top: -130px;
  margin-left: 95px;
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

/* Since ballons are on the image, we need this hack */
.text-fix {
  margin-top: -100px;
  margin-left: 100px;
}

.btn{
  color: black;
  position: absolute;
  margin-top: -80px;
  margin-left: 900px;
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

.btn2{
  color: black;
  position: absolute;
  margin-top: -90px;
  margin-left: 420px;
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

</style>
