<template>
    <div class="flex flex-row items-center p-1">
        <div class="flex screen bg-black mx-1 mt-2 w-12 h-18 text-center items-center justify-center"> {{ modelValue }} </div>
        <div class="flex flex-col">
            <button 
                @mousedown="startHold(1)"
                @mouseup="stopHold"
                @mouseleave="stopHold"
                @touchstart.prevent="startHold(1)"
                @touchend="stopHold" 
                class="w-8 h-7 rounded-t-full" 
                :disabled="modelValue===maxValue"
            >ᐃ</button>
            <button 
                @mousedown="startHold(-1)"
                @mouseup="stopHold"
                @mouseleave="stopHold"
                @touchstart.prevent="startHold(-1)"
                @touchend="stopHold"
                class="w-8 h-7 rounded-b-full"
                :disabled="modelValue===minValue"
            >ᐁ</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const props = defineProps<{
        modelValue: number;
        minValue: number;
        maxValue: number;
    }>();

    const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
    }>();

    let interval: ReturnType<typeof setInterval> | null = null;
    let acceleration = ref(1);
    let holdTime = 0;

    function updateNr(changeValue: number) {
    let newValue = props.modelValue + changeValue;

    if (newValue < props.minValue) {
        newValue = props.minValue;
    } else if (newValue > props.maxValue) {
        newValue = props.maxValue;
    }

    emit('update:modelValue', newValue);
    }

    function startHold(change: number) {
        acceleration.value = 1;
        holdTime = 0;

        updateNr(change * acceleration.value); // initial tick

        interval = setInterval(() => {
            holdTime++;
            acceleration.value = Math.min(holdTime, 8);
            updateNr(change * acceleration.value);
        }, 100); // every 100ms 
    }

    function stopHold() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        acceleration.value = 1;
        holdTime = 0;
    }
</script>