<template>
  <div class="book">
    <p class="fairy-letter">Lorem ipsum dolor sit amet,
      <droppable></droppable>
      id quo paulo scaevola. Eu everti feugait vel, utamur discere ne duo.
      <droppable></droppable>
      Ex odio adhuc comprehensam eos, cum dicunt maiestatis ad.
      <droppable></droppable>
      id quo paulo scaevola
    </p>
  </div>
</template>

<script type="text/javascript">
import Droppable from './Droppable.vue'

export default {
  name: 'BookPage',

  components: { Droppable }
}
</script>

<style type="text/css">
.book {
  padding: 1.6em 2.3em 1.4em;
  margin: 4.6em 20em;
  border-radius: 3px;
  text-align: left;
  background: #fff6d1 /*Alternative color: #f3eded*/
}
.fairy-letter{
  font: 400 32px/1.3 'Arizonia', Helvetica, sans-serif;
  color: #2b2b2b;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}
</style>
