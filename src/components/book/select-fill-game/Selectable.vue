<template>
  <div>
    <span class="box fairy-letter" @click="defocus = true">
      {{selected.text}}
    </span>
    <div v-if="defocus">
      <div class="defocus" @click="defocus = false">
        <div v-for="option in options" :key="option.id">
          <SelectOption
            :handle-click="() => selectOption(option)"
            :option="option"
          ></SelectOption>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import SelectOption from './SelectOption.vue'

export default {
  name: 'Selectable',

  components: {SelectOption},

  props: {
    handleAnswered: {
      type: Function,
      default: () => ({})
    },

    options: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    selected: false,
    defocus: false
  }),

  methods: {
    selectOption (option) {
      this.selected = option
      this.handleAnswered(option)
    }
  }
}
</script>

<style type="text/css" scoped>

.book {
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

.fairy-letter {
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  color: #2b2b2b;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  text-align: center
}

</style>
