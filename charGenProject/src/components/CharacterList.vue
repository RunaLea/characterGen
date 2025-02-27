<template>
<button @click="fetchCharacters">Click</button>
<div v-for="character in characters" :key="character.id">
  {{ character.char_name }}
  {{ character.char_lvl }}
</div>
</template>
<script>
export default {
    components:{
    },
    data() {
      return {
        characters: []
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
    },
  }
</script>