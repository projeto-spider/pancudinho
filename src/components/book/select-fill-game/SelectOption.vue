<template>
  <div>
    <div class="option" @click="handleClick"> {{option.text}} </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'SelectOption',

  props: {
    option: {
      type: Object,
      required: true
    },

    handleClick: {
      type: Function,
      default: () => ({})
    }
  },

  data: () => ({})
}
</script>

<style type="text/css" scoped>
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
</style>
