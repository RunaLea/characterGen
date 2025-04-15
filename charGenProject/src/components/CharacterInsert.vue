<template>
  <div class="flex flex-row w-xs xs:w-md md:w-sm lg:w-lg 2xl:w-2xl  justify-between">

    <div class="flex flex-col justify-items-start">

      <div class="flex flex-row flex-wrap gap-x-[16%]">
        <input class="column-elem w-[25%] -mr-6 lg:w-20 lg:-mr-8 2xl:w-30 2xl:-mr-12" type="text" v-model="nameInput" placeholder="Name">

        <div class="column-elem w-[20%]" v-if="charOptions.races.length !== 0">Race: 
          <select v-model="raceInput">
            <option value="">None</option>
            <option v-for="race in charOptions.races" :value="race.id" :key="race.id">
            {{race.race_title}}
            </option>
          </select>
        </div>

        <div class="column-elem w-[20%]" v-if="charOptions.backgrounds.length !== 0">Background: 
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
        <div class="flex flex-row justify-between items-center">
          <p class="w-20">Strength:</p> 
          <NrSelector :input="strInput" class="w-14"></NrSelector>
          <p class="w-5">{{ abilityModifier(strInput) }}</p>
        </div>
        <div class="flex flex-row justify-between items-center">
          <p class="w-20">Dexterity:</p> 
          <NrSelector :input="dexInput" class="w-14"></NrSelector>
          <p class="w-5">{{ abilityModifier(dexInput) }}</p>
        </div>
        <div class="flex flex-row justify-between items-center">
          <p class="w-20">Constitution:</p> 
          <NrSelector :input="conInput" class="w-14"></NrSelector>
          <p class="w-5">{{ abilityModifier(conInput) }}</p>
        </div>
        <div class="flex flex-row justify-between items-center">
          <p class="w-20">Intelligence:</p> 
          <NrSelector :input="intInput" class="w-14"></NrSelector>
          <p class="w-5">{{ abilityModifier(intInput) }}</p>
        </div>
        <div class="flex flex-row justify-between items-center">
          <p class="w-20">Wisdom:</p> 
          <NrSelector :input="wisInput" class="w-14"></NrSelector>
          <p class="w-5">{{ abilityModifier(wisInput) }}</p>
        </div>
        <div class="flex flex-row justify-between items-center">
          <p class="w-20">Charisma:</p> 
          <NrSelector :input="chaInput" class="w-14"></NrSelector>
          <p class="w-5">{{ abilityModifier(chaInput) }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-between items-center w-60">
      <div class="">
        <div class="flex flex-col items-between">
          <div v-if="charOptions.classes.length !== 0" v-for="(ids, index) in classes.ids" :key="index">

            <div class="flex flex-row flex-wrap mb-6 items-start justify-center">
              <div class="flex flex-col w-[50%] lg:w-[60%] 2xl:w-[65%]">
                <div class="flex flex-row flex-wrap justify-between column-elem">Class: 
                  <select v-model="classes.ids[index]">
                    <option value="">None</option>
                    <option v-for="charClass in charOptions.classes" :value="charClass.id" :key="charClass.id">
                      {{ charClass.class_title }}
                    </option>
                  </select>
                </div>

                <div class="flex flex-row flex-wrap justify-between column-elem w-[160%] md:w-[180%] lg:w-[140%] 2xl:w-[130%]" v-if="classes.ids[index] > 0">Subclass: 
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
          <button @click="addCharClass" class="rounded-[100%] w-6.5 text-center self-center pb-0.4 pt-0.4 text-base">+</button>
        </div>
      </div>
      <button class="w-fit md:w-fit px-3 py-1 rounded-full dark:text-light text-[10px] lg:text-xs 2xl:text-base" @click="charInsert()">✦ Generate ✦</button>

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
        strInput: {
          value: 10,
          minValue: 1,
          maxValue: 20
        },
        dexInput: {
          value: 10,
          minValue: 1,
          maxValue: 20
        },
        conInput: {
          value: 10,
          minValue: 1,
          maxValue: 20
        },
        intInput: {
          value: 10,
          minValue: 1,
          maxValue: 20
        },
        wisInput: {
          value: 10,
          minValue: 1,
          maxValue: 20
        },
        chaInput: {
          value: 10,
          minValue: 1,
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
    computed: {
      profBonus(){
        return Math.floor((this.charLvl.value -1) / 4) +2
      },
      
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
            let charChecklist = [];
            this.characters.forEach((character, index) => {
              this.characterIds.push(parseInt(character.id))
              if(charChecklist.includes(character.id)){
                console.log("double found", index)

                let firstIndex = charChecklist.indexOf(character.id);
                let classLvl = this.characters[firstIndex].class_lvl;
                let classTitle = this.characters[firstIndex].class_title;
                let subclassTitle = this.characters[firstIndex].subclass_title;

                // changes the respective data to arrays
                this.characters[firstIndex].class_lvl = [classLvl];
                this.characters[firstIndex].class_title = [classTitle];
                this.characters[firstIndex].subclass_title = [subclassTitle];

                // pushes the new data into the arrays
                this.characters[firstIndex].class_lvl.push(character.class_lvl);
                this.characters[firstIndex].class_title.push(character.class_title);
                this.characters[firstIndex].subclass_title.push(character.subclass_title);

                this.characters.splice(index, 1)
              }
              else{
                charChecklist.push(character.id)
              }})
            console.log("character fetch", this.characters)
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
        },

        abilityModifier(ability){
          if(ability.value < 12){
            return Math.floor((ability.value) / 2) -5
          }
          else{
            return "+" + String(Math.floor((ability.value) / 2) -5)
          }
        },

        onWindowLoad(){
          console.log("window load event");
          this.fetchOptions();
          this.addCharClass(); //adds a default character class option
        }
    }
  }
</script>