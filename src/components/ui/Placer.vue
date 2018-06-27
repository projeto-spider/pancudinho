<template>
  <div class="Placer">
    <input type="text" class="PlacerInput" name="Place-To-Hold">
  </div>
</template>

<script>
export default {
  name: 'Placer'

}
</script>

<style scoped>
  .Placer {
    border-image: url(/static/media/grey_button05.90173512.png) 7 27 repeat;
    border-width: 6px 26px 10px;
    border-style: solid;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #eeeeee;
  }
  input[type=text]{
    background-color: rgb(238, 238, 238);
    border: none;
    height: 25px;
    margin: 0px -22px -6px;
    text-align: center;
    border-radius: 5px;
}

input[type=text]:focus{
    outline: 0!important;
}
</style>

