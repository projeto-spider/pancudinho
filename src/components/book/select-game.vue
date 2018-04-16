<template>
  <div>
    <div class="book">
      <p class="fairy-letter">Lorem ipsum dolor sit amet, est nullam discere intellegam ne, pro ne alterum facilisi, tibique deseruisse id per. Moderatius <span class="box" @click.prevent="(words[0].selected_gap=true) && (showOptions=true)">{{words[0].word_in_the_gap}}</span> reprehendunt has eu. Aperiri definitiones conclusionemque vix eu, atqui velit pertinacia no his, <span class="box" @click.prevent="(words[1].selected_gap=true) && (showOptions=true)">{{words[1].word_in_the_gap}}</span> mei eros civibus lobortis ne. Lorem feugiat <span class="box" @click.prevent="(words[2].selected_gap=true) && (showOptions=true)">{{words[2].word_in_the_gap}}</span> sanctus nam no, et equidem conclusionemque cum. Sit in soleat fastidii dissentiunt, per facete veritus ne. </p>
    </div>

    <div v-if="showOptions===true">
      <div class="defocus" @click="showOptions = false">
        <div class="box one" @click="((words[0].selected_word=true) && select())"> {{word1}} </div>
        <div class="box three" @click="((words[2].selected_word=true) && select())"> {{word3}} </div>
        <div class="box two" @click="((words[1].selected_word=true) && select())"> {{word2}} </div>
        <button @click="delet()"> Again </button>
      </div>

    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'BookselectGame',

  data: () => ({
    word1: "Lorem ",
    word2: "Praesent blandit",
    word3: "Nullam et",
    showOptions: false,

    words:[
        {
        word1: "Lorem ",
        selected_word:false,
        selected_gap:false,
        word_in_the_gap:"?",
        },
        {
        word1: "Praesent blandit",
        selected_word:false,
        selected_gap:false,
        word_in_the_gap:"?"
        },
        {
        word1: "Nullam et",
        selected_word:false,
        selected_gap:false,
        word_in_the_gap:"?"
        },
     ],
  }),

  methods:{
    select(){
      for(var i=0; i<this.words.length;i++){
        for(var j=0; j<this.words.length;j++){
          if(this.words[i].selected_word===true && this.words[j].selected_gap===true ){
            this.words[j].word_in_the_gap=this.words[i].word1
          }
        }
      }
      this.words[0].selected_word=false
      this.words[1].selected_word=false
      this.words[2].selected_word=false
      this.words[0].selected_gap=false
      this.words[1].selected_gap=false
      this.words[2].selected_gap=false
    },

    delet(){
      this.words[0].word_in_the_gap="?"
      this.words[1].word_in_the_gap="?"
      this.words[2].word_in_the_gap="?"
    },
  }
}
</script>

<style type="text/css">
.book {
  padding: 1.6em 2.3em 10.4em;
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
  border-radius: 5px
}

.box.one {
  padding: 1em 2em;
  margin: 0.4em 1em;
  width: 60px;
  margin-left: 190px;
  margin-top: 160px;
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
  margin-left: 460px;
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

button{
  width: 90px;
  margin-top:180px;
  margin-left: 930px;
  border-radius: 10px;
  background: plum;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 400 30px/1.3 'Arizonia', Helvetica, sans-serif;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
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
</style>

