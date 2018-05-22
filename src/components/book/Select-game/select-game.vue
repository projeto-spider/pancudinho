<template>
  <div>
    <div class="book">
       <div v-if="inputOn==false" class="box five" @click.prevent="(inputOn=true) && (input=true) && (delet())">
        Input Mode
        </div>
        <div v-if="inputOn==true" class="box five" @click.capture="input=false" @click="cleanAnswers()" @click.prevent="inputOn=false">
        Select Mode
        </div>
      <p class="fairy-letter">
        {{text[0].text1}}
        <span v-if= "input===false" class="box" @click.prevent="(words[0].selected_gap = true) && (showOptions = true)">
          {{words[0].word_in_the_gap}}</span>
        <input v-if="input===true" v-model="words[0].typedAnswer" class="text"> <span class="check" v-if="(words[0].showCheck) && inputOn">✓</span> <span class="X" v-if="words[0].showX && inputOn">X</span>
        {{text[1].text1}}
        <span v-if= "input===false" class="box" @click.prevent="(words[1].selected_gap = true) && (showOptions = true)">
          {{words[1].word_in_the_gap}}</span>
        <input v-if="input===true" v-model="words[1].typedAnswer" class="text"> <span class="check" v-if="(words[1].showCheck) && inputOn">✓</span> <span class="X" v-if="words[1].showX && inputOn">X</span>
        {{text[2].text1}}
        <span v-if= "input===false" class="box" @click.prevent="(words[2].selected_gap = true) && (showOptions = true)">
          {{words[2].word_in_the_gap}}</span>
        <input v-if="input===true" v-model="words[2].typedAnswer" class="text"> <span class="check" v-if="(words[2].showCheck) && inputOn">✓</span> <span class="X" v-if="words[2].showX && inputOn">X</span>
        {{text[3].text1}}
      </p>
      <div v-if="inputOn" class="box five" @click="(verifyAnswers())">
        Submit
      </div>
      <div class="box five" v-if="!inputOn"  @click="delet()">
        Again
      </div>
      <div class="box five" v-if="inputOn"  @click="cleanAnswers()">
        Again
      </div>
      <div class="box five" @click="showTips = true">
        Tips
      </div>
    </div>

    <div v-if="showOptions">
      <div class="defocus">
        <button style="margin-right:80px;" @click="showTips=true">Tips</button> <button style="margin-right:80px;" @click="showOptions = false">X</button>
        <div class="box one" @click="((words[0].selected_word = true) && (select()) || (showOptions = false))"> {{word1}} </div>
        <div class="box three" @click="((words[2].selected_word = true) && (select()) || (showOptions = false))"> {{word3}} </div>
        <div class="box two" @click="((words[1].selected_word = true) && (select()) || (showOptions = false))"> {{word2}} </div>
      </div>
    </div>
    <div v-if="showTips">
      <div class=defocus>
        <button style="margin-left:190px;" @click="showTips=false">X</button>
        <div class="box four fairy-letter">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.</div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'BookselectGame',

    props: {
    words: {
      type: Array,
      default: () => []
    },
     text: {
      type: Array,
      default: () => []
    },
  },

  data: () => ({
    word1: 'Lorem',
    word2: 'Praesent blandit',
    word3: 'Nullam et',
    showOptions: false,
    showTips: false,
    input: true,
    inputOn: true,

  }),
  methods: {
    select () {
      for (var i = 0; i < this.words.length; i++) {
        for (var j = 0; j < this.words.length; j++) {
          if (this.words[i].selected_word === true && this.words[j].selected_gap === true) {
            this.words[j].word_in_the_gap = this.words[i].word1
          }
        }
      }
      for (var k = 0; k < this.words.length; k++) {
        this.words[k].selected_gap = false
        this.words[k].selected_word = false
      }
    },
    delet () {
      for (var i = 0; i < this.words.length; i++) {
        this.words[i].selected_gap = false
        this.words[i].selected_word = false
        this.words[i].word_in_the_gap = '?'
      }
    },
    verifyAnswers () {
      for (var i = 0; i < this.words.length; i++) {
        if (this.words[i].word1 === this.words[i].typedAnswer.toLowerCase()) {
          this.words[i].showCheck = true
          this.words[i].showX = false
        } else {
          this.words[i].showCheck = false
          this.words[i].showX = true
        }
      }
    },
    cleanAnswers () {
      for (var i = 0; i < this.words.length; i++) {
        this.words[i].typedAnswer = ''
        this.words[i].showCheck = false
        this.words[i].showX = false
      }
    }
  }
}
</script>
<style type="text/css">
.book {
  padding: 1.6em 2.3em 1.4em;
  margin: 4.6em 20em;
  border : 4mm ridge rgb(170, 50, 220, .6);
  border-radius: 3px;
  text-align: left;
  background: #fff6d1 /*Alternative color: #f3eded*/
}

.box {
  padding: 0.1em 2em;
  margin: 0.4em 0.4em;
  background: #ffffff;
  border-radius: 5px;
}

.box.one {
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

.box.two {
  padding: 1em 2em;
  margin: 0.4em 1em;
  width: 170px;
  margin-left: 400px;
  margin-top: 40px;
  background: plum;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 400 23px/1.3 'Arizonia', Helvetica, sans-serif;
  font-weight: bold;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
  color: black
}

.box.three {
  padding: 1em 2em;
  margin: 0.4em 1em;
  width: 170px;
  margin-left: 830px;
  margin-top: 5px;
  background: plum;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 400 23px/1.3 'Arizonia', Helvetica, sans-serif;
  font-weight: bold;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
  color: black
}

.box.four{
  padding: 0.1em 2em;
  margin: 0.4em 0.4em;
  background: #ffffff;
  border-radius: 5px;
  margin-top: 2.5cm;
}

.box.five{
  width: 110px;
  border-radius: 10px;
  margin-left: 205px;
  background: MediumOrchid;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 30px 'Arizonia', Helvetica, sans-serif;
  color: black;
  text-align: center;
  padding: 0.3em 0.3em;
}

button{
  text-align: center;
  padding: 0.3em 0.3em;
  width: 90px;
  margin-top:30px;
  margin-left: 50px;
  border-radius: 10px;
  background: MediumOrchid;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 400 30px/1.3 'Arizonia', Helvetica, sans-serif;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
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
.defocus {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

.box:hover{
  background: #cceeff

}
.fairy-letter{
  font: 400 40px/1.3 'Arizonia', Helvetica, sans-serif;
  color: #2b2b2b;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}
.check{
  color: green;
}
.X{
  color: red;
}

</style>
