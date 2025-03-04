<template>
<div class="columnContainer">
  <div class="columnElem">Name</div><span class="tab"></span>
  <div class="columnElem">Level</div><span class="tab"></span>
  <div class="columnElem">Race</div><span class="tab"></span>
</div>
<div v-for="character in characters" :key="character.id" class="charContainer">
  <div class="charElem">{{ character.char_name }}</div><span class="tab"></span> 
  <div class="charElem">{{ character.char_lvl }}</div><span class="tab"></span>
  <div class="charElem">{{ character.race_title }}</div><span class="tab"></span>
</div>
<br><button @click="fetchCharacters">Load</button>
</template>
<script>
export default {
    components:{
    },
    data() {
      return {
        characters: [],
        races: [],
        bgs: []
      }
    },
    methods: {
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
.tab{
  display: inline-block;
  margin-left: 4em;
}
.charContainer{
  display: flex;
}
.columnContainer{
  display: flex;
  border-style: none none solid none;
  border-color: white;
  margin-bottom: 4px;
}
.charElem{
 width: 1em;
}
.columnElem{
 width: 1em;
 color: white;
}
</style>