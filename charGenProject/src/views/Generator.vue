<template>
    <div class=" -z-1 position: fixed h-screen w-screen left-0 top-0 bg-black"></div>
    <div class="flex justify-center">
        <h1 class="text-xl font-medium text-white">Tabletop Character Generator</h1>
    </div>
    <div class="text-white">
        <div class="flex flex-row items-center justify-center">
            <div class="columns-1">
                <h2>Characters</h2> 
                <CharacterList/>
            </div>
            <div class="columns-1">
                <h2>New Character</h2>
                <CharacterInsert/>
            </div>
            <div class="columns-1">
            </div>
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
<!-- <style>
    /* Is used for spacing between the character properties & columns */
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
</style> -->