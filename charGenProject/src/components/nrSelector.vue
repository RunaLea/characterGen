<template>
    <div class="nrSelector">
        <div>{{input.value}}</div>
        <div v-if="this.input" class="buttonContainer">
        <button @click="updateNr(1)">ᐃ</button>
        <button @click="updateNr(-1)">ᐁ</button>
    </div>
    </div>
</template>
<script>
export default{
    props:[
        'input'
    ],
    methods: {
        updateNr(changeValue){
          this.input.value += changeValue;
          if(this.input.value < this.input.minValue){
            this.input.value = this.input.minValue
          }
          else if(this.input.value > this.input.maxValue){
            this.input.value = this.input.maxValue
          }
        }
    }
}
</script>
<style scoped>
.nrSelector{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-style: solid;
    border-color: rgb(200, 200, 200);
    padding: 4px;
    width: 4em;
}
.buttonContainer{
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-between;
    height: 2.8em;
}
button{
    display: flex;
    height: 1.5em;
    width: 2em;
    justify-content: center;
    align-items: center;
    border-color: rgb(200, 200, 200);
    background-color: rgba(0, 0, 0, 0);
    font-size: smaller;
    color: rgb(200, 200, 200);
}
</style>