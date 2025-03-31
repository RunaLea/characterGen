<template>
  <div class="flex flex-row w-xs md:w-sm lg:w-lg 2xl:w-2xl  justify-between">

    <div class="flex flex-col justify-items-start">

      <div class="flex flex-row flex-wrap gap-x-[12%]">
        <input class="column-elem" type="text" v-model="nameInput" placeholder="Name">

        <div class="column-elem" v-if="charOptions.races.length !== 0">Race: 
          <select v-model="raceInput">
            <option value="">None</option>
            <option v-for="race in charOptions.races" :value="race.id" :key="race.id">
            {{race.race_title}}
            </option>
          </select>
        </div>

        <div class="column-elem" v-if="charOptions.backgrounds.length !== 0">Background: 
          <select v-model="bgInput">
            <option value="">None</option>
            <option v-for="bg in charOptions.backgrounds" :value="bg.id" :key="bg.id">
              {{bg.bg_title}}
            </option>
          </select>
        </div>
      </div>

      <div class="box-elem">Proficiency <br> bonus:
        <h3>+{{ profBonus }}</h3>
      </div>

      <div class="flex flex-col w-48 mt-2 gap-y-[2%]">
        <div class="flex flex-row justify-between items-center">Strength: 
          <NrSelector :input="strInput"></NrSelector>
        </div>
        <div class="flex flex-row justify-between items-center">Dexterity: 
          <NrSelector :input="dexInput"></NrSelector>
        </div>
        <div class="flex flex-row justify-between items-center">Constitution: 
          <NrSelector :input="conInput"></NrSelector>
        </div>
        <div class="flex flex-row justify-between items-center">Intelligence: 
          <NrSelector :input="intInput"></NrSelector>
        </div>
        <div class="flex flex-row justify-between items-center">Wisdom: 
          <NrSelector :input="wisInput"></NrSelector>
        </div>
        <div class="flex flex-row justify-between items-center">Charisma: 
          <NrSelector :input="chaInput"></NrSelector>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-between items-center">
      <div class="">
        <div class="flex flex-col items-between">
          <div v-if="charOptions.classes.length !== 0" v-for="(ids, index) in classes.ids" :key="index">

            <div class="flex flex-row flex-wrap mb-6 items-start" >
              <div class="flex flex-col w-[100%] lg:w-[50%] 2xl:w-[60%]">
                <div class="flex flex-row flex-wrap justify-between">Class: 
                  <select v-model="classes.ids[index]">
                    <option value="">None</option>
                    <option v-for="charClass in charOptions.classes" :value="charClass.id" :key="charClass.id">
                      {{ charClass.class_title }}
                    </option>
                  </select>
                </div>

                <div class="flex flex-row flex-wrap justify-between" v-if="classes.ids[index] > 0">Subclass: 
                  <select v-model="classes.subclasses[index]">
                    <option value="">None</option>
                    <option v-for="charSubclass in charOptions.subclasses.filter(subclass => subclass.class_id === classes.ids[index])" :value="charSubclass.id" :key="charSubclass.id">
                      {{ charSubclass.subclass_title }}
                    </option>
                  </select>
                </div>

              </div>

              <NrSelector :input="classes.lvls[index]" v-if="classes.ids.length > 0" @click="updateLvl()"></NrSelector>
            </div>
          </div>
          <button @click="addCharClass" class="rounded-[100%] w-6 text-center self-center pb-0.5">+</button>
        </div>
      </div>
      <button class="w-fit p-2" @click="charInsert()">Generate</button>

    </div>

  </div>
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
        characters: [],
        characterIds: [],
        charIdInput: 0,
        nameInput: "",
        raceInput: "",
        bgInput: "",
        classes: {
          ids: [],
          lvls: [],
          subclasses: []
        },
        charLvl: {
          value: 1,
          minValue: 1,
          maxValue: 20
        },
        profBonus: 2,
        strInput: {
          value: 10,
          minValue: 0,
          maxValue: 20
        },
        dexInput: {
          value: 10,
          minValue: 0,
          maxValue: 20
        },
        conInput: {
          value: 10,
          minValue: 0,
          maxValue: 20
        },
        intInput: {
          value: 10,
          minValue: 0,
          maxValue: 20
        },
        wisInput: {
          value: 10,
          minValue: 0,
          maxValue: 20
        },
        chaInput: {
          value: 10,
          minValue: 0,
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
    watch:{},
    methods: {
        // Inserts values into the characters table in the database
        // check of als de velden leeg zijn een aparte functie maken
        charInsert(){
          if(this.raceInput == 0 || 
          this.bgInput == 0 || 
          this.nameInput == "" || 
          this.classes.ids.length == 0 || 
          this.classes.lvls.length == 0 || 
          this.classes.subclasses.length == 0){
            alert("Please fill in all fields!")
          }
          else{
            console.log("Character insert")
            fetch('http://localhost/characterGen_be/CharacterListInsert.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                char_name: this.nameInput,
                race_id:  this.raceInput,
                bg_id: this.bgInput,
                char_lvl: this.charLvl.value,
                prof_bonus: this.profBonus,
                char_str: this.strInput.value,
                char_dex: this.dexInput.value,
                char_con: this.conInput.value,
                char_int: this.intInput.value,
                char_wis: this.wisInput.value,
                char_cha: this.chaInput.value
              })
            })
            .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.text();
            })
            .then(text => {
              if (text.includes("New record created successfully")) {
                this.fetchCharacters();
              } else {
                console.error("Error inserting character:", text);
              }
            })
            .catch(error => {
              console.error("Error inserting character:", error);
            })
          }
        },

        charClassesInsert(){
          // Inserts values into the char_classes table in the database
          if(this.classes.ids.length == 0 || this.classes.lvls.length == 0 || this.classes.subclasses.length == 0){
            alert("Please fill in all fields!")
          }
          else{
            this.classes.ids.forEach(element => {
              console.log(this.classes.ids);
              console.log("Class insert");
              var index = this.classes.ids.indexOf(element);
              fetch('http://localhost/characterGen_be/charClassesInsert.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                char_id: this.charIdInput,
                class_id: this.classes.ids[index],
                class_lvl: this.classes.lvls[index].value,
                subclass_id: this.classes.subclasses[index]
              })
            })
            })
          }
        },

        fetchOptions(){
          fetch('http://localhost/characterGen_be/DataOptions.php')
          .then(response => response.json())
          // 0/48 = races || 49/66 = backgrounds || 67/79 = classes || 80/198 = subclasses
          .then(data => {
            this.charOptions.races = data.slice(0, 49);
            this.charOptions.backgrounds = data.slice(49, 67);
            this.charOptions.classes = data.slice(67, 80);
            this.charOptions.subclasses = data.slice(80, 198);
          })
        },

        fetchCharacters(){
          fetch('http://localhost/characterGen_be/CharacterList.php')
          .then(response => response.json())
          .then(data => {
            this.characters = data
            console.log("character fetch", this.characters)
            this.characters.forEach( character => {
              this.characterIds.push(parseInt(character.id))
            })
            console.log("IDs: ", this.characterIds)
            this.pickNextId()
          })
        },

        pickNextId(){
          // na de if statement een return en dan gewoon een nieuwe if statement ipv if else /else
          // Picks the next ID for the character
          if(this.characterIds.length == 0){
            alert("ID pick failed");
          }
          else if(this.characterIds.length == 1){
            console.log(`One character ID detected: ${this.characterIds[0]}`);
            this.charIdInput = this.characterIds[0];
            console.log(`New character ID: ${this.charIdInput}`);
            this.charClassesInsert();
          }
          else{
            console.log(`Multiple character IDs detected: ${this.characterIds}`);
            this.charIdInput = this.characterIds.reduce((a, b) => Math.max(a, b), - Infinity);
            console.log(`New character ID: ${this.charIdInput}`);
            this.charClassesInsert();
          }
        },

        addCharClass(){
          // if the charLvl is below maxValue a new class will be added to the character
          if(this.charLvl.value < this.charLvl.maxValue){
            this.classes.ids.push(null);
            this.classes.lvls.push({
              value: 1,
              minValue: 0,
              maxValue: 20
            });
            this.classes.subclasses.push(null);
            this.updateLvl();
            console.log(this.classes);
          }
          else{
            alert("Max level reached!");
          }
        },

        updateLvl(){ 

          // adds all class levels and changes the charLvl value to that value
          this.charLvl.value = this.classes.lvls.reduce((total, lvlObj) => {
            if (lvlObj && typeof lvlObj.value === 'number') { // Check for undefined
              return total + lvlObj.value;
            } 
            else {
              console.error("Invalid level object:", lvlObj);
              return total;
            }
          }, 0);

          // adjusts the charLvl to the minValue if it goes below the minValue
          if (this.charLvl.value < this.charLvl.minValue){
            this.classes.lvls[0].value = this.charLvl.minValue;
            this.updateLvl()
          }

          // adjusts the maxValue of each classes.lvls so the character cannot go over the charLvl.maxvalue
          this.classes.lvls.forEach(lvl => {
            lvl.maxValue = this.charLvl.maxValue - (this.charLvl.value - lvl.value);
          });
          // console.log("Character Level:", this.charLvl.value);

          // updates the profBonus according to the charLvl
          this.profBonus = Math.floor((this.charLvl.value -1) / 4) +2;
        },

        onWindowLoad(){
          console.log("window load event");
          this.fetchOptions();
          this.addCharClass(); //adds a default character class option
        }
    }
  }
</script>
<!-- <style scoped>
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
  .Container{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: stretch;
    padding: 8px;
    margin-bottom: 24px;
  }
  .leftPart{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .rightPart{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .topLeftPart{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    flex-grow: 7;
    justify-content: space-between;
    column-gap: 4.5em;
    width: stretch;
    border-style: none none solid none;
    border-color: rgb(200, 200, 200);
    padding: 8px;
    margin-bottom: 24px;
  }
  .topRightPart{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
    border-style: none none solid solid;
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
  .classButton{
    display: flex;
    justify-self: center;
    margin: 8px;
    border-color: rgb(200, 200, 200);
    background-color: rgba(0, 0, 0, 0);
    border-radius: 100%;
    color: rgb(200, 200, 200);
    height: 1.8em;
    padding-top: 3px;
  }
  .classContainer{
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    width: 20em;
    align-items: center;
  }
  .boxElement{
    font-size: 8pt;
    display: flex;
    flex-direction: column;
    width: fit-content;
    text-align: center;
    border: solid rgb(200, 200, 200);
    padding: 4px;
  }
  h3{
    font-size: 16pt;
  }
</style> -->