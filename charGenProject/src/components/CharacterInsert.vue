<template>
  <div class="topContainer">
    <input type="text" v-model="characterName" placeholder="Character name">
    <div>Race: 
      <select v-model="raceTitle">
      <option disabled value="">Select a Race</option>
      <option value="">A</option>
      <!-- <option v-for="races in 49" :value="races.value">
      {{charOptions[races-1].race_title}}
      </option> -->
    </select>
    </div>
    <div>Class: 
      <select>
      <option disabled value="">Select a Class</option>
      </select>
    </div>
  </div>
  <br><br><br><div>Selected race: {{ raceTitle }}</div>
<br><br><br><button @click="charInsert">insert</button>
</template>
<script>
export default {
    mounted(){
      this.onWindowLoad();
    },
    components:{},
    data() {
      return {
        characterName: "",
        characterLvl: "",
        charOptions: "", // 0/48 = races || 49/66 = backgrounds || 67/79 = classes || 80/198 = subclasses
        // characterRace: charOptions.indexOf(raceTitle)
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
          .then(data => {
            this.charOptions = data
            console.log(this.charOptions)
          })
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