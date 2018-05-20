<template>
  <div class="Panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Panel'
}
</script>

<style>
.Panel{
  border-style: solid;
  border-width: 27px;
  border-image: url('../../assets/grey_panel.png') 27 fill repeat;
}
</style>
