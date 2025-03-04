<template>
<div class="columnContainer">
  <div class="columnElem">Name</div><span class="tab"></span>
  <div class="columnElem">Level</div><span class="tab"></span>
  <div class="columnElem">Race</div><span class="tab"></span>
</div>
<!-- Makes a !!constant!! for every character in characters and adds the name, lvl and race to the list.-->
<div v-for="character in characters" :key="character.id" class="charContainer">
  <div class="charElem">{{ character.char_name }}</div><span class="tab"></span> 
  <div class="charElem">{{ character.char_lvl }}</div><span class="tab"></span>
  <div class="charElem">{{ character.race_title }}</div><span class="tab"></span>
</div>
<br><button @click="fetchCharacters">Load</button>
</template>
<script>
export default {
    components:{},
    data() {
      return {
        characters: []
      }
    },
    methods: {
      // Fetches data from the php and adds it to JSON
      fetchCharacters(){
        fetch('http://localhost/characterGen_be/CharacterList.php')
        .then(response => response.json())
        .then(data => {
          this.characters = data
          console.log(this.characters)
        })
      }
    }}
</script>
<style scoped>
/* Is used for spacing between the character properties & columns */
.tab{
  display: inline-block;
  margin-left: 4em;
}
/* Container that holds all characters */
.charContainer{
  display: flex;
}
/* Container that holds the column titles */
.columnContainer{
  display: flex;
  border-style: none none solid none;
  border-color: white;
  margin-bottom: 4px;
}
/* Class for a character item */
.charElem{
 width: 1em;
}
/* Class for a column title item */
.columnElem{
 width: 1em;
 color: white;
}
</style>