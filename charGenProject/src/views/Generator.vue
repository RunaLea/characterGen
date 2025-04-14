<template>
    <div class="background"></div>
    <div class="flex justify-center header">
        <h1 class=" text-light text-[min(5vw,30px)]">⬩ . ✦ Tabletop Character Generator ✦ . ⬩</h1>
    </div>
    <div class="">
        <div class="row-center">
            <div class="columns-lg md:columns-xs lg:columns-md 2xl:columns-sm">
                <div class=" card bg-light dark:bg-mid-trans text-dark dark:text-light-trans md:h-212">
                    <h2 class="header mb-1.5">Characters</h2> 
                    <CharacterList/>
                </div>
                
            </div>
            <div class=" columns-lg md:columns-md lg:columns-xl 2xl:columns-3xl">
                <div class=" card bg-light dark:bg-mid-trans text-dark dark:text-light-trans md:h-212">
                    <h2 class="header mb-1.5">New Character</h2>
                    <CharacterInsert/>
                </div>
            </div>
            <div class="columns-lg md:columns-3xl lg:columns-5xl 2xl:columns-sm">
                <div class=" card bg-light dark:bg-mid-trans text-dark dark:text-light-trans 2xl:h-212">

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