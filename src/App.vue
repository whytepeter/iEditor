<script setup>
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import Editor from "./views/Editor.vue";
</script>

<template>
  <div class="flex items-center gap-2">
    <NavBar />
    <SideBar />
    <Editor />
  </div>
</template>

<style scoped></style>
