<template>
  <div>
    <div class="book">
      <p class="fairy-letter">Lorem ipsum dolor sit amet, est nullam discere intellegam ne, pro ne alterum facilisi, tibique deseruisse id per. Moderatius <span class="box"></span> reprehendunt has eu. Aperiri definitiones conclusionemque vix eu, atqui velit pertinacia no his, <span class="box"></span> mei eros civibus lobortis ne. Lorem feugiat <span class="box"></span> sanctus nam no, et equidem conclusionemque cum. Sit in soleat fastidii dissentiunt, per facete veritus ne. </p>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'BookselectGame'
}
</script>

<style type="text/css">
.book {
  padding: 1.6em 2.3em 10.4em;
  margin: 4.6em 20em;
  border : 4mm ridge rgb(170, 50, 220, .6);
  border-radius: 3px;
  text-align: left;
  background: #fff6d1 /*Alternative color: #f3eded*/
}

.box {
  padding: 0.1em 2em;
  margin: 0.4em 0.4em;
  background: #ffffff;
  border-radius: 5px
}

.box:hover{
  background: #cceeff
}

.fairy-letter{
  font: 400 40px/1.3 'Arizonia', Helvetica, sans-serif;
  color: #2b2b2b;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}
</style>
