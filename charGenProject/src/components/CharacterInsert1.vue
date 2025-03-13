<template>
  <div class="topContainer">
    
    <input type="text" v-model="nameInput" placeholder="Character name">

    <div v-if="charOptions.races.length !== 0">Race: 
      <select v-model="raceInput">
      <option disabled value="">Select a Race</option>
      <option v-for="race in charOptions.races" :value="race.id">
      {{race.race_title}}
      </option>
    </select>
    </div>

    <div v-if="charOptions.classes.length !== 0">Class: 
      <select v-model="classInput">
      <option disabled value="">Select a Class</option>
      <option v-for="charClass in charOptions.classes" :value="charClass.id">
        {{ charClass.class_title }}
      </option>
      </select>

      <div v-if="classInput.length !== 0" class="nrSelector">
        <button @click="updateNr('classLvlInput', 1)">ᐃ</button>
        {{classLvlInput.value}}
        <button @click="updateNr('classLvlInput', -1)">ᐁ</button>
      </div>
    </div>

  </div>
  <br><br><br><br><br><br>
<button @click="charInsert">insert</button>
</template>
<script>
export default {
    mounted(){
      this.onWindowLoad();
    },
    components:{},
    data() {
      return {
        nameInput: "",
        raceInput: "",
        classInput: "",
        classLvlInput: {
          value: 1,
          minValue: 0,
          maxValue: 20
        },
        subclassInput: "",
        charOptions: {
          races: [],
          backgrounds: [],
          classes: [],
          sublasses: []
        }
      }
    },
    methods: {
        //Inserts values into the characters table in the database
        charInsert(){
            fetch('http://localhost/characterGen_be/CharacterListInsert.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                char_name: this.characterName,
                char_lvl: this.characterLvl
              })
            })
        },
        fetchOptions(){
          fetch('http://localhost/characterGen_be/DataOptions.php')
          .then(response => response.json())
          // 0/48 = races || 49/66 = backgrounds || 67/79 = classes || 80/198 = subclasses
          .then(data => {
            data.forEach((option, index) => {
              if(index < 49){this.charOptions.races.push(option)}
              else if(index < 67){this.charOptions.backgrounds.push(option)}
              else if(index < 80){this.charOptions.classes.push(option)}
              else {this.charOptions.sublasses.push(option)}
            })
            // console.log(this.charOptions.races, this.charOptions.backgrounds, this.charOptions.classes, this.charOptions.sublasses)
          })
        },
        updateNr(data, changeValue){
          this[data].value += changeValue;
          if(this[data].value < this[data].minValue){
            this[data].value = this[data].minValue
          }
          else if(this[data].value > this[data].maxValue){
            this[data].value = this[data].maxValue
          }
        },
        onWindowLoad(){
          console.log("window load event");
          this.fetchOptions();
        }
    }
  }
</script>
<style scoped>
  .topContainer{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>