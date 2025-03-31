<template>
    <div class=" background bg-mid dark:bg-dark"></div>
    <div class="flex justify-center header">
        <h1 class=" text-light ">Tabletop Character Generator</h1>
    </div>
    <div class="">
        <div class="row-center">
            <div class="columns-lg md:columns-xs lg:columns-md 2xl:columns-sm">
                <div class=" card bg-light dark:bg-mid text-dark dark:text-light md:h-212">
                    <h2 class="header mb-1.5">Characters</h2> 
                    <CharacterList/>
                </div>
                
            </div>
            <div class=" columns-lg md:columns-md lg:columns-xl 2xl:columns-3xl">
                <div class=" card bg-light dark:bg-mid text-dark dark:text-light md:h-212">
                    <h2 class="header mb-1.5">New Character</h2>
                    <CharacterInsert/>
                </div>
            </div>
            <div class="columns-lg md:columns-3xl lg:columns-5xl 2xl:columns-sm">
                <div class=" card bg-light dark:bg-mid text-dark dark:text-light 2xl:h-216">

                </div>
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