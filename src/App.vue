

<template>
  <div>
    <NavBarComponent />
  <RouterView/>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBarComponent from './shared/components/navBarComponent.vue';


</script>

<style scoped>


</style>
