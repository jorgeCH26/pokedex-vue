<template>
    <div>
        <div v-if="props.isLodoading" class="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
            <img :src="load" alt="" class="w-64 h-64 rounded-full" />
        </div>
    </div>
</template>

<script setup lang="ts">
import load from '../../assets/load.gif'



const props = withDefaults(
    defineProps<{
        isLodoading: boolean
    }>(),
    {
        isLodoading: false
    }
);


</script>

<style scoped>

</style>