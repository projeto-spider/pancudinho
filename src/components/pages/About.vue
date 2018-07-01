 <template>
  <div class="text">
    <h1>About</h1>
    <li> Pançudinho é um projeto de doutorado de Lennon Sales pelo Projeto SPIDER que busca o ensinamento dinâmico sobre medição de forma lúdica e contextual.</li>
      <h2 > Professor Doutor:</h2>
      <li> Sandro Bezerra </li>
      <h2 > Mestre:</h2>
      <li> Lennon Sales </li>
      <h2> Graduandos:</h2>
      <li> Ana Vitoria Bacelar </li>
      <li> Henrique Sales </li>
      <li> João Ferreira </li>
      <li> Leonarda Costa </li>
      <li> Tuby Neto </li>
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
  }
}
</script>

<style scoped>
.text{
  width: 430px;
  text-align: justify;
}
.margin-layout {
  margin: 20px
}
</style>
