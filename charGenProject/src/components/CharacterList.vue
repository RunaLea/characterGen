<template>
<div class="row-space-around pb-2 font-bold">
  <div class="column-elem ">Name</div>
  <div class="column-elem">Level</div>
  <div class="column-elem">Race</div>
</div>
<!-- Makes a !!constant!! for every character in characters and adds the name, lvl and race to the list.-->
<div v-if="characters.length !== 0" v-for="character in characters" :key="character.id" class="row-space-around">
  <div class="column-elem">{{ character.char_name }}</div>
  <div class="column-elem">{{ character.char_lvl }}</div>
  <div class="column-elem">{{ character.race_title }}</div>
</div>
<!-- <br><button @click="fetchCharacters">Load</button> -->
</template>
<script>
export default {
  mounted(){
      this.onWindowLoad();
    },
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
      },
      onWindowLoad(){
          console.log("window character load event");
          this.fetchCharacters();
        }
    }}
</script>
<!-- <style scoped>
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
</style> -->