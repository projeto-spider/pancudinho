<template>
  <div>
    <div class="goalbox s1">
      {{ goal }}
    </div>
    <div class="pacman"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Goal',

  props: {
    goal: {
      type: String,
      required: true
    }
  }
}
</script>

<style type="text/css">
.goalbox {
  width: 23em;
  margin: 0 15%;
  background: #ccedf3;
  padding: 5%;
  text-align: center;
  position: relative;
  border-radius: 30px;
  width: 15em;
}
.s1:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid #ccedf3;
  border-right: 10px solid transparent;
  border-top: 10px solid #ccedf3;
  border-bottom: 10px solid transparent;
  left: 19px;
  bottom: -19px;
}
.pacman{
  display:block;
  width:0px;
  height:0px;
  border: 30px solid #ff0;
  border-right: 30px solid transparent;
  border-radius:50%;
  position:relative;
}
</style>
