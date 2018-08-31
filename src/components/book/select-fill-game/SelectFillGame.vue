<template>
<div>
  <br>
  <p style="text-align:center;">

    <Button v-if="selectMode" :handle-click="() => selectMode = false" :label="'Input Mode'"></Button>
    <Button v-else :handle-click="() => selectMode = true" :label="'Select Mode'"></Button>

  <div v-if="selectMode">
    <SelectPage :state="state"></SelectPage>
  </div>
  <div v-else>
    <FillPage :state="state"></FillPage>
  </div>
</div>
</template>

<script type="text/javascript">

import FillPage from './FillPage.vue'
import SelectPage from './SelectPage.vue'
import Button from '../../ui/Button.vue'

export default {
  name: 'BookSelectManual',

  components: { FillPage, SelectPage, Button },

  props: {
    state: {
      type: Object,
      required: true
    }
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
      }
    ],
    input: false,
    defocus: false,
    selectMode: true
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

  <div class="option" @click="input=true"> Input mode </div>

      <p>
        <span class="box" @click="defocus = true"></span>
      </p>
    <div v-if="defocus">
      <div class="defocus" @click="defocus = false">
            <div class="option"> {{item.words}} </div>

        </div>
       </div>
  */
  background: #bdbdbd;
  padding: 1em !important;
  border-radius: 5px;
  opacity: 0.5;
  display: block;
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
  margin: 0.4em 1em;
  margin-top: 4cm;
  width: 60px;
  margin-left: 130px;
  background: plum;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 400 23px/1.3 'Arizonia', Helvetica, sans-serif;
  font-weight: bold;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
  color: black;
  float:left;
}

.fairy-letter {
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  color: #2b2b2b;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}

input{
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
