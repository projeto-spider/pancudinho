<template>
  <div class="text">
    <h1>About</h1>
    <div v-for="item in text" :key="item.id">
      <h2 v-if="item.important==true"> {{item.text}} </h2>
      <li v-else> {{item.text}} </li>
    </div>
    <p>
      <a href="http://www.spider.ufpa.br/index.php?id=inicio"> Saiba mais sobre PROJETO SPIDER</a>
    </p>
    <p>
      <button @click="state.goTo(PAGE.START)">Back</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',

  props: {
    state: Object
  },

  data: () => ({
    text:[
    {text: 'Pançudinho é um projeto de doutorado de Lennon Sales pelo Projeto SPIDER que busca o ensinamento dinâmico sobre medição de forma lúdica e contextual.'},
    {
      text: 'Professor Doutor:',
      important: true
    },
    {text: 'Sandro Bezerra'},
    {
      text: 'Mestre:',
      important: true
    },
    {text: 'Lennon Sales'},
    {
      text: 'Graduandos:',
      important: true
    },
    {text: 'Ana Vitoria Bacelar'},
    {text: 'Henrique Sales'},
    {text: 'João Ferreira'},
    {text: 'Leonarda Costa'},
    {text: 'Tuby Neto'}

    ]
  })
}
</script>

<style scoped>
.text{
  padding: 430px;
  text-align: justify
}
.margin-layout {
  margin: 20px
}
</style>
