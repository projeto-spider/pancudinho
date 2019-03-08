<template>
  <div class="handbook-background" v-show="open">
    <div class="handbook-main">
      <div class="handbook-words">
        <ul>
          <li
            v-for="(item, i) in handbook"
            :key="i"
            :class="{active: i === selectedIndex}"
            @click="selectWord(item.word)"
          >{{ item.word }}</li>
        </ul>
      </div>
      <div class="handbook-explanation">
        <p
          v-if="selectedItem"
          v-for="(paragraph, i) in selectedItem.explanation"
          :key="i"
        >{{ paragraph }}</p>
      </div>
    </div>
    <button class="close-button" @click="open = false">X</button>

  </div>
</template>

<script>
import handbook from '../../handbook.json'

export default {
  name: 'HandBook',

  data: () => ({
    handbook,

    selectedIndex: 0,

    open: false
  }),

  computed: {
    selectedItem () {
      return this.handbook[this.selectedIndex]
    }
  },

  methods: {
    openHandBook (word) {
      this.selectWord(word)
      this.open = true
    },

    selectWord (word) {
      const index = this.handbook.findIndex(item => item.word === word)
      this.selectedIndex = index === -1 ? 0 : index
    }
  }
}
</script>

<style scope>
.handbook-background {
  background-color: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.handbook-main {
  background-color: white;
  height: 625px;
  width: 600px;
  display: flex;
  justify-content: center;
  box-shadow: 5px 5px 5px rgba(0,0,0, .4);
}

.handbook-words {
  max-width: 200px;
  background-color: #ececec;
}

.handbook-words ul {
  list-style: none;
  padding: 0;
}

.handbook-words ul li {
  padding: 8px;
  color: gray;
  cursor: pointer;
}

.handbook-words ul li.active {
  padding: 8px;
  color: #4169E1;
  cursor: pointer;
}

.handbook-explanation {
  padding: 10px;
}

.handbook-main > div {
  flex: 1;
  overflow-y: auto;
}

.close-button {
  position: fixed;
  font-family: Tahoma, Geneva, sans-serif;
  font-weight: bold;
  background-color: #B20000;
  color: white;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  box-shadow: 5px 5px 5px rgba(0,0,0, .4);
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
