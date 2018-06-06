<template>

<div>
  <span class="box" @click="defocus = true"></span>
    <div v-if="defocus">
      <div class="defocus" @click="defocus = false">
        <div v-for="option in options" :key="option.id" >
            <div class="option"> {{option.words}} </div>

        </div>
      </div>
    </div>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'Selectable',

  props: {
    /*
      defocus: {
      type: Boolean,
      required: false
    }

      options: {
      type: Array,
      default: () => []
    }
    */
  },

  data: () => ({

    options: [
      {
        text: 'Lorem ipsum dolor sit amet, est nullam discere intellegam ne, pro ne alterum facilisi, tibique deseruisse id per. Moderatius',
        words: 'lorem',
        id: 1
      },

      {
        text: 'reprehendunt has eu. Aperiri definitiones conclusionemque vix eu, atqui velit pertinacia no his,',
        words: 'ipsum',
        id: 2
      },
      {
       text: 'Curabitur feugiat sed ligula ac tempor. Ut id facilisis massa. Mauris pretium lacus sem, et scelerisque dui euismod',
       words: 'vehicula',
       id: 3
      }
    ],

    defocus: false
  })
}
</script>

<style type="text/css" scoped>

.book{
  padding: 5em 3em 3em 3em;
  margin: 1em 5em;
  border-radius: 3px;
  text-align: left;
  background: #fff6d1; /*Alternative color: #f3eded*/
  box-shadow: .2em .2em .5em #333
}

.box {
  /*
  padding: 20px 110px;
  background: rgba(219, 201, 201, 0.133);
  border-radius: 5px;
  */
  background: #bdbdbd;
  border-radius: 5px;
  opacity: 0.5;
  display: block;
  padding: 20px 110px;
  margin: 0;


}

.defocus {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(162, 162, 162, 1);
  display: table;
  opacity: 0.5;
  transition: opacity .3s ease;
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

.fairy-letter {
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  color: #2b2b2b;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}

</style>
