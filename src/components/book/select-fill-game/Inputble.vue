<template>
  <div>
    <input type="" v-model="typed">
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Inputble',

  props: {
    correctAnswer: {
      type: String,
      default: null
    },

    tip: {
      type: String,
      default: null
    }
  },

  data: () => ({
    typed: ''
  })
}
</script>

<style type="text/css" scoped>
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
input.valid {
  background-color: #2cda82
}
input.invalid {
  background-color: #e83737
}
</style>
