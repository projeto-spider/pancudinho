<template>
  <div class="book">
    <div v-for="option in options" :key="option.id">
      <div class="fairy-letter">{{option.text}}</div>
        <div v-if="option.right">
          <span class='right'> </span>
        </div>
        <div v-if="option.wrong">
          <span class='false'> </span>
        </div>
        <div v-if="(!option.right && !option.wrong)">
        <p>
        <span class="box" @click.prevent="defocus=true"  @click="option.select_ver = true"> {{option.words}}</span>
        </p>
        <div v-if="defocus">
          <div class="defocus" @click="defocus = false">
            <div v-for="option in options" :key="option.id" >
                <div class="option" @click="option.select = true" > {{option.words}} </div>
            </div>
          </div>
        </div>
        </div>
    </div>
    <button @click="doAgain">Again</button><br>
    <button @click="checkAnswers">Submit</button>
  </div>
</template>

<script>
import Selectable from './Selectable.vue'
export default {
  components: {Inputble},
  data: () => ({
    options: [
      {
       text: 'Lorem ipsum dolor sit amet, est nullam discere intellegam ne, pro ne alterum facilisi, tibique deseruisse id per. Moderatius',
       words: 'lorem',
       words_lac: '',
       id: 1,
       typed: '',
       right: false,
       wrong: false,
       select: false,
       select_ver: false
      },
      {
       text: 'reprehendunt has eu. Aperiri definitiones conclusionemque vix eu, atqui velit pertinacia no his,',
       words: 'ipsum',
       id: 2,
       typed: '',
       right: false,
       wrong: false,
       select_ver: false,
       select: false
      }
   ],

    input: false,
    defocus: false,
    selectMode: true,

  }),
  methods:{
    select(){
      for (var i=0;i<this.options.length;i++){
        if ((this.options[i].select=== true) && (this.options[i].select_ver === true)){
          this.options[i].right=true
          this.options[i].wrong=false
        }else{
          this.options[i].right=false
          this.options[i].wrong=true
        }
      }
    },


    checkAnswers(){
      for (var i=0;i<this.options.length;i++){
        if ((this.options[i].select=== true) && (this.options[i].select_ver === true)){
          this.options[i].right=true
          this.options[i].wrong=false
        }else{
          this.options[i].right=false
          this.options[i].wrong=true
        }
      }
    },
    doAgain(){
      for (var i=0;i<this.options.length;i++){
        this.options[i].typed=''
        this.options[i].right=false
        this.options[i].wrong=false

      }
    }
  }
}
</script>

<style scoped>
.book{
  padding: 5em 3em 3em 3em;
  margin: 1em 5em;
  border-radius: 3px;
  text-align: left;
  background: #fff6d1; /*Alternative color: #f3eded*/
  box-shadow: .2em .2em .5em #333
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

.box {

  background: #bdbdbd;
  border-radius: 5px;
  opacity: 0.5;
  display: block;
  padding: 20px 110px;
  margin: 0;
}
.right {

  background-color:#12f51963;
  border-radius: 5px;
  opacity: 0.5;
  display: block;
  padding: 20px 110px;
  margin: 0;
}
.false {

  background-color:#f5121263;
  border-radius: 5px;
  opacity: 0.5;
  display: block;
  padding: 20px 110px;
  margin: 0;
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

</style>
