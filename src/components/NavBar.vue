<template>
  <div
    class="fixed pl-72 left-0 top-0 w-full p-2 px-6 px-md-10 bg-[#A670FF] flex items-center justify-between"
  >
    <div class="flex items-center gap-4">
      <h2 class="text-white font-bold text-xl ml-4">iEDITOR</h2>

      <input
        class="focus:outline-none w-36 p-2 bg-[#8E5DDD] text-white focus:border-white focus:border capitalize"
        type="text"
        v-model="projectName"
      />
    </div>
    <div class="flex items-center gap-4">
      <button
        class="p-2 px-4 w-28 rounded bg-white text-[#150037] hover:opacity-95"
      >
        Preview
      </button>
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
