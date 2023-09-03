<template>
  <div
    class="fixed left-0 top-0 w-full p-2 px-6 px-md-10 bg-[#A670FF] flex items-center justify-between"
  >
    <h2 class="text-white font-bold text-xl">iEDITOR</h2>

    <div class="flex items-center gap-4">
      <input
        class="focus:outline-none w-36 p-2 bg-[#8E5DDD] text-white focus:border-white focus:border"
        type="text"
        v-model="projectName"
      />
      <button
        class="p-2 px-4 w-28 rounded bg-white text-[#150037] hover:opacity-95"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const projectName = ref("untitled");
</script>

<style></style>
