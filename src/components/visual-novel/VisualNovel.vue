<template>
  <Panel>
    <div v-for="(scene, index) in scenes" :key="scene.id" v-show="scene.showScene">
      <div>
        <img :src="images[index]">
      </div>
      <button class='btn2' v-if='showButton' @click='letters()'>Iniciar a Visual Novel</button>
      <div v-if='index==0 || index==5 || index==8 || index==9 || index==10 || index==11' class='text2'> {{scene.showText}} </div>
      <div v-else class='text'> {{scene.showText}} </div>
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
        showText: '',
        showScene: true
      },
      {
        text: 'Eu sei que a minha estética está ótima do jeito que está.',
        image: 'Quadro2.jpg',
        showScene: false
      },
      {
        text: 'Mas notei que tenho me alimentado de um jeito bem deprimente.',
        image: 'Quadro3.jpg',
        showScene: false
      },
      {
        text: 'Então decidi que a partir de hoje minha vida vai mudar.',
        image: 'Quadro4.jpg',
        showScene: false
      },
      {
        text: 'Com alimentação saudável e exercícios físicos. Mas preciso de ajuda para isso.',
        image: 'Quadro5.jpg',
        showScene: false
      },
      {
        text: 'Venha comigo se você quiser viver. Eu sou O TREINADOR.',
        image: 'Quadro6.jpg',
        showScene: false
      },
      {
        text: 'Mas não é um caminho tão fácil como você pensa. Existem conceitos obscuros que você não conhece...',
        image: 'Quadro7.jpg',
        showScene: false
      },
      {
        text: 'Mas como eu sou muito bondoso, eu posso ensinar para você.',
        image: 'Quadro8.jpg',
        showScene: false
      },
      {
        text: 'Primeiro, temos que aprender a trabalhar com medidas, pois elas são essenciais para o nosso progresso.',
        image: 'Quadro9.jpg',
        showScene: false
      },
      {
        text: 'Então, te apresento a medição. Com ela, nós vamos coletar, armazenar e relatar dados para que...',
        image: 'Quadro10.jpg',
        showScene: false
      },
      {
        text: 'P: Balela isso! \n T: Como é?',
        image: 'Quadro11.jpg',
        showScene: false
      },
      {
        text: 'P: Sei que você só ta fazendo isso pra levar meu dinheiro!',
        image: 'Quadro12.jpg',
        showScene: false
      },
      {
        text: 'Mas quando falo que vou te ajudar, eu não tô mentindo.',
        image: 'Quadro13.jpg',
        showScene: false
      },
      {
        text: 'Com a medição, você pode tomar decisões mais precisas e evidenciar melhor os pontos que quer melhorar.',
        image: 'Quadro14.jpg',
        showScene: false
      },
      {
        text: 'P: Ok, ok...vamos ver o que você pode fazer \n T: Boa, garoto!',
        image: 'Quadro15.jpg',
        showScene: false
      },
      {
        text: 'Agora, VAMOS COMEÇAR ESSA JORNADA!',
        image: 'Quadro16.jpg',
        showScene: false
      }
    ],
    showButton: true,
    counter: 0,
    counter2: 0,
    images: []
  }),

  created () {
    this.images = this.scenes.map(scene => {
      return require(`../../assets/${scene.image}`)
    })
  },

  methods: {
    nextText () {
      if (this.changeScene) {
        this.counter++
        if (this.counter === this.scenes.length) {
          this.counter = 0
          for (let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].showText = ''
          }
        }
        for (let i = 0; i < this.scenes.length; i++) {
          if (i === this.counter) this.scenes[i].showScene = true
          else this.scenes[i].showScene = false
        }
        this.changeScene = false
        this.letters()
      }
    },
    letters () {
      this.showButton = false
      for (let i = 0; i < this.scenes.length; i++) {
        if (this.scenes[i].showScene) {
          let text = this.scenes[i].text
          let showText = this.scenes[i].showText
          let counter = this.counter2
          let vm = this
          let interval = setInterval(function () {
            showText = showText + text[counter]
            vm.scenes[vm.counter].showText = showText
            counter++
            if (counter === text.length) {
              clearInterval(interval)
              vm.changeScene = true
            }
          }, 50)
        }
        this.counter2 = 0
      }
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

.text{
  color: black;
  position: absolute;
  margin-top: -130px;
  margin-left: 95px;
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

.text2{
  color: black;
  position: absolute;
  margin-top: -100px;
  margin-left: 100px;
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
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
