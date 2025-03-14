<template>
  <div class="topContainer">
    
    <input class="topElement" type="text" v-model="nameInput" placeholder="Character name">

    <div class="topElement" v-if="charOptions.races.length !== 0">Race: 
      <select v-model="raceInput">
        <option disabled value="">Select a Race</option>
        <option v-for="race in charOptions.races" :value="race.id">
        {{race.race_title}}
        </option>
    </select>
    </div>

    <div class="topElement" v-if="charOptions.backgrounds.length !== 0">Background: 
      <select v-model="bgInput">
        <option disabled value="">Select Background</option>
        <option v-for="bg in charOptions.backgrounds" :value="bg.id">
          {{bg.bg_title}}
        </option>
      </select>
    </div>

    <div class="classContainer" v-if="charOptions.classes.length !== 0">
      <div class="topElement" >
        <div class="classElement">
          <div class="topElement">Class: 
            <select v-model="classInput">
              <option disabled value="">Select a Class</option>
              <option v-for="charClass in charOptions.classes" :value="charClass.id">
                {{ charClass.class_title }}
              </option>
            </select>
          </div>
          <div class="topElement" v-if="classInput > 0">Subclass: 
            <select v-model="subclassInput">
              <option disabled value="">Subclass</option>
              <option v-for="subClass in charOptions.subclasses.filter(subclassCheck)" :value="subClass.id">
                {{ subClass.subclass_title }}
              </option>
            </select>
          </div>
        </div>
        <NrSelector :input="classLvlInput" v-if="classInput > 0"></NrSelector>

      </div>
    </div>
    

  </div>
  <div class="aScoreContainer">
    <div class="aScoreElement">Strength: 
      <NrSelector :input="strInput"></NrSelector>
    </div>
    <div class="aScoreElement">Dexterity: 
      <NrSelector :input="dexInput"></NrSelector>
    </div>
    <div class="aScoreElement">Constitution: 
      <NrSelector :input="conInput"></NrSelector>
    </div>
    <div class="aScoreElement">Intelligence: 
      <NrSelector :input="intInput"></NrSelector>
    </div>
    <div class="aScoreElement">Wisdom: 
      <NrSelector :input="wisInput"></NrSelector>
    </div>
    <div class="aScoreElement">Charisma: 
      <NrSelector :input="chaInput"></NrSelector>
    </div>
  </div>

<button class="genButton" @click="charInsert">Generate</button>
</template>
<script>
import NrSelector from './nrSelector.vue';

export default {
    mounted(){
      this.onWindowLoad();
    },
    components:{
      NrSelector //prop = input || input should have value, minValue, maxValue
    },
    data() {
      return {
        nameInput: "",
        raceInput: "",
        bgInput: "",
        classInput: "",
        classLvlInput: {
          value: 1,
          minValue: 1,
          maxValue: 20
        },
        subclassInput: "",
        strInput: {
          value: 10,
          minValue: 8,
          maxValue: 20
        },
        dexInput: {
          value: 10,
          minValue: 8,
          maxValue: 20
        },
        conInput: {
          value: 10,
          minValue: 8,
          maxValue: 20
        },
        intInput: {
          value: 10,
          minValue: 8,
          maxValue: 20
        },
        wisInput: {
          value: 10,
          minValue: 8,
          maxValue: 20
        },
        chaInput: {
          value: 10,
          minValue: 8,
          maxValue: 20
        },
        charOptions: {
          races: [],
          backgrounds: [],
          classes: [],
          subclasses: []
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
            this.charOptions.races = data.slice(0, 49);
            this.charOptions.backgrounds = data.slice(49, 67);
            this.charOptions.classes = data.slice(67, 80);
            this.charOptions.subclasses = data.slice(80, 199);
            console.log(this.charOptions.races, 
            this.charOptions.backgrounds, 
            this.charOptions.classes, 
            this.charOptions.subclasses)
          })
        },
        subclassCheck(value, index, array){
          // returns the subclasses that have a class id that is the same as the id of the chosen class
          console.log(this.classInput, value.class_id);
          if(this.classInput == value.class_id){
            return value
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
  input{
    background-color: rgba(0, 0, 0, 0);
    border-style: solid;
    border-color: rgb(200, 200, 200);
    color: rgb(200, 200, 200);
  }
  select{
    display: flex;
    height: fit-content;
    width: 140px;
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 4px;
    border-style: solid;
    border-color: rgb(200, 200, 200);
    background-color: rgba(0, 0, 0, 0);
    color: rgb(200, 200, 200);
  }
  option{
    background-color: rgb(0, 0, 0);
  }
  .topContainer{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-style: none none solid none;
    border-color: rgb(200, 200, 200);
    padding: 8px;
    margin-bottom: 24px;
  }
  .topElement{
    display: flex;
    flex-direction: row;
    height: min-content;
    justify-content: space-around;
  }
  .classElement{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
  }
  .aScoreContainer{
    display: flex;
    flex-direction: column;
    margin: 8px;
    min-width: 160px;
    max-width: 214px;
  }
  .aScoreElement{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  .genButton{
    display: flex;
    justify-self: end;
    align-self: flex-end;
    border-color: rgb(200, 200, 200);
    background-color: rgba(0, 0, 0, 0);
    color: rgb(200, 200, 200);
    font-size: 24px;
    padding: 8px;
  }
</style>