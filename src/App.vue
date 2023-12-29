<script setup>
import Nav from "./components/Nav.vue";
</script>

<template>
  <div>
    <Nav />
    <RouterView></RouterView>
    <notifications />
  </div>
</template>

<style scoped></style>
