<template>
<input type="text" v-model="characterName" placeholder="name">
<input type="text" v-model="characterLvl" placeholder="level">
<button @click="charInsert">insert</button>
<div>{{ characterName }}</div>
<div>{{ characterLvl }}</div>
</template>
<script>
export default {
    components:{
    },
    data() {
      return {
        characterName: "",
        characterLvl: ""
      }
    },
    methods: {
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
  }}
</script>