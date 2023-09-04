<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div
      v-show="showPopup"
      ref="preview"
      :class="
        showPopup
          ? 'animate__animated animate__fadeIn'
          : 'animate__animated animate__fadeOut'
      "
      class="z-20 fixed inset-0 flex items-center justify-center"
    ></div>

    <div
      v-show="showPopup"
      @click="showPopup = false"
      style="background: #15003753"
      class="fixed inset-0 overlay animate__animated animate__fadeIn"
    ></div>
    <div class="grid grid-cols-1 gap-2">
      <button
        @click="showPopup = !showPopup"
        class="bg-[#A670FF] px-6 py-3 rounded-lg text-sm text-white hover:opacity-90"
      >
        Show Pupop <strong>{{ popup && popup.name }}</strong>
      </button>
      <button
        @click="$router.go(-1)"
        class="bg-[#A670FF] px-6 py-3 rounded-lg text-sm text-white hover:opacity-90"
      >
        Go Back
      </button>
    </div>
    <button @click="showPopup = false">
      <i
        class="text-3xl pi pi-times-circle text-white absolute right-10 top-10 z-20"
      ></i>
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const showPopup = ref(false);
const preview = ref(null);

const popup = computed(() => {
  const id = route.query.id;
  let db = JSON.parse(localStorage.getItem("database"));

  return db.find((el) => el.id == id);
});

console.log(popup.value);

watch(showPopup, () => {
  if (popup.value) {
    if (showPopup.value) {
      const parser = new DOMParser();
      const element = parser.parseFromString(popup.value.element, "text/html")
        .body.firstChild;

      element.id = popup.value.name;
      preview.value.appendChild(element);
    } else {
      let element = document.getElementById(popup.value.name);
      console.log(element);
      preview.value.removeChild(element);
    }
  }
});
</script>

<style></style>
