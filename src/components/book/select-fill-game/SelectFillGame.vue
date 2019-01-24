<template>
  <div>
    <h1 v-if="title">{{ title }}</h1>
    <h2>Arraste as resposta para as lacunas</h2>

    <div class="book">
      <table>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-if="row.indent" style="width: 10%"></td>

          <td :colspan="row.indent ? 1 : 2" style="text-align: left">{{row.text}}</td>

          <td v-if="row.answer">
            <drop
              v-if="!row.filled"
              drop-effect="move"
              @drop="handleDrop(row, ...arguments)"
            >
              <span
                class="fillable"
                :class="{ [row.status]: true }"
              >?</span>
            </drop>

            <span
              v-else
              class="fillable"
              :class="{ [row.status]: true }"
              @click="dropout(row)"
            >
              {{ row.filled.answer }}
            </span>
          </td>
        </tr>
      </table>

      <div class="option-list">
        <drag
          v-for="(option, i) in availableOptions"
          :key="i"
          :transfer-data="option"
        >
          <span class="filler">{{ option.answer }}</span>
        </drag>
      </div>

      <Button v-if="!reveal" @click.native="submit">
        Corrigir
      </Button>

      <Button v-else @click.native="nextGame">
        Avançar
      </Button>
    </div>
  </div>
</template>

<script>
import { Drag, Drop } from 'vue-drag-drop'
import Button from '../../ui/Button.vue'

export default {
  name: 'BookSelectManual',

  components: {
    Button,
    Drag,
    Drop
  },

  props: {
    state: {
      type: Object,
      required: true
    },

    title: {
      type: String,
      required: false
    },

    chunks: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    reveal: false,
    rows: [],
    options: [],
    selectedOptions: {},
    input: false,
    defocus: false,
    selectMode: true
  }),

  created () {
    this.rows = this.chunks.map(chunk => ({
      ...chunk,
      filled: null,
      status: 'unknown'
    }))
    this.options = this.chunks
      .filter(row => row.answer)
      .sort(() =>
        Math.random() - Math.random()
      )
      .map(chunk => ({
        ...chunk,
        filling: false
      }))
  },

  computed: {
    availableOptions () {
      return this.options.filter(option =>
        !option.filling
      )
    }
  },

  methods: {
    handleDrop (where, who) {
      if (this.reveal) {
        return
      }

      for (let row of Object.values(this.rows)) {
        if (row.filled === who) {
          row.filled = null
        }
      }

      who.filling = true
      where.filled = who
    },

    dropout (row) {
      if (this.reveal) {
        return
      }

      row.filled.filling = false
      row.filled = false
    },

    submit () {
      this.reveal = true

      for (let row of this.rows) {
        row.status =
          row.filled && row.answer === row.filled.answer
            ? 'correct'
            : 'incorrect'
      }
    },

    nextGame () {
      this.state.closeGame()
    }
  }
}
</script>

<style scoped>
.book {
  display: block;
  width: 700px;
  min-height: 300px;
  background-color: white;
  padding: 30px;
  box-shadow: 0 10px 10px -5px;
  margin: 0 auto;
  user-select: none;
}

.book table {
  width: 100%;
}

.book table td {
  width: 50%;
}

.fillable, .filler {
  background-color: #dedede;
  width: 100%;
  display: block;
  border: 1px solid grey;
  border-radius: 3px;
  margin: 0 10px;
  padding: 3px 1px;
  text-align: center;
  cursor: pointer;
}

.filler, .filled {
  border-color: purple;
  margin: 10px 0;
}

.fillable.correct {
  border-color: green;
}

.fillable.incorrect {
  border-color: red;
}

/* .book{
  padding: 5em 3em 3em 3em;
  margin: 1em 5em;
  border-radius: 3px;
  text-align: left;
  background: #fff6d1; /*Alternative color: #f3ede
  box-shadow: .2em .2em .5em #333
} */

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
