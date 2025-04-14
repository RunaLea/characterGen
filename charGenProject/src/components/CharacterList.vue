<template>
<div class="row-space-around pb-2 font-bold">
  <div class="column-elem w-[20%]">Name</div>
  <div class="column-elem w-[20%]">Level</div>
  <div class="column-elem w-[20%]">Race</div>
</div>
<!-- Makes a !!constant!! for every character in characters and adds the name, lvl and race to the list.-->
<div v-if="characters.length !== 0" v-for="entry in characters" :key="entry.id" class="row-space-around">
  <div class="column-elem w-[20%]">{{ entry.char_name }}</div>
  <div class="column-elem w-[20%]">{{ charLvl(entry) }}</div>
  <div class="column-elem w-[20%]">{{ entry.race_title }}</div>
</div>
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
    computed: {
      
    },

    methods: {
      // Fetches data from the php and adds it to JSON
      fetchCharacters(){
        fetch('http://localhost/characterGen_be/CharacterList.php')
        .then(response => response.json())
        .then(data => {
          this.characters = data
          let charChecklist = [];
          this.characters.forEach((character, index) => {
            if(charChecklist.includes(character.id)){
              console.log("Double found for", character.char_name)

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
          console.log("characters:", this.characters);
        })
      },

      charLvl(character){
        if(Array.isArray(character.class_lvl)){
          return character.class_lvl.reduce((total, lvl) => total + Number(lvl), 0)
        }
        else{
          return character.class_lvl
        }
      },

      onWindowLoad(){
          console.log("window character load event");
          this.fetchCharacters();
        }
    }}
</script>