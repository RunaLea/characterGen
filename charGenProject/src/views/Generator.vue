<template>
    <div class="header">
        <h1>Tabletop Character Generator</h1>
    </div>
    <div class="content">
        <div class="sidebarLeft">
            <h2>Characters</h2> 
            <CharacterList/>
        </div>
        <div class="charGenContainer">
            <h2>New Character</h2>
            <CharacterInsert/>
        </div>
        <div class="sidebarRight">
        </div>
    </div>
</template>
<script>
import CharacterList from "../components/CharacterList.vue";
import CharacterInsert from "../components/CharacterInsert.vue";
export default{
    components:{
        CharacterList,
        CharacterInsert
    },
}
</script>
<style>
    .tab{
    display: inline-block;
    margin-left: 4em;
    }
    .header{
        display: flex;
        width: 99vw;
        justify-self: center;
        justify-content: center;
        border-style: solid;
        margin: 8px;
        border-color: rgb(200, 200, 200);
    }
    .content{
        display: flex;
        justify-self: center;
        flex-direction: row;
        justify-content: space-between;
        width: 99vw;
        height: 88vh;
        max-height: fit-content;
    }
    .charGenContainer{
        border-style: none solid solid solid;
        border-color: rgb(128, 128, 128);
        padding: 8px;
        min-width: fit-content;
        width: 60%;
        margin-left: 4px;
        margin-right: 4px;
    }
    .sidebarLeft{
        justify-self: flex-start;
        border-style: none none solid solid;
        border-color: rgb(128, 128, 128);
        padding: 8px;
        min-width: fit-content;
        width: 20%;
        margin-right: 4px;
    }
    .sidebarRight{
        border-style: none solid solid none;
        border-color: rgb(128, 128, 128);
        padding: 8px;
        min-width: fit-content;
        width: 20%;
        margin-left: 4px;
    }
    h1{
        color: rgb(200, 200, 200);
    }
    h2{
        text-align: center;
        border-style: solid;
        border-color: rgb(200, 200, 200);
        margin-bottom: 8px;
        padding-left: 4px;
        padding-right: 4px;
        color: rgb(200, 200, 200);
    }
</style>