<template>
    <div>
        <div v-if="props.isLodoading" class="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
            <span class="loading loading-spinner loading-xl text-primary"></span>
        </div>
    </div>
</template>

<script setup lang="ts">



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