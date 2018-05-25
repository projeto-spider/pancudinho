<template>
  <div>
    <span class="box" @click="defocus = true"></span>
    <div v-show="defocus">
      <div class="defocus" @click="defocus = false">
        <div v-for="option in options" :key="option.id">
          <div class="option"> {{option.text}} </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Selectable',

  props: {
  },

  data: () => ({
    options: [
      {
        text: 'lalala',
        id: 1
      },

      {
        text: 'lelele',
        id: 2
      }
    ],
    defocus: false
  })
}
</script>

<style type="text/css" scoped>
.box {
  padding: 20px 110px;
  background: #2cda82;
  border-radius: 5px;
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
  margin-left: 150px;
  background: plum;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 400 23px/1.3 'Arizonia', Helvetica, sans-serif;
  font-weight: bold;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
  color: black
}
</style>
