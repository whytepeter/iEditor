<template>
  <div class="bg-white w-full px-4 py-2 my-4 border-b text-[#2E2E2E] text-xs">
    <div v-if="data" class="flex items-center gap-2 justify-between">
      <div class="flex items-center gap-4 flex-wrap">
        <GlobalProperties :showProperties="showProperties" :element="element" />
        <TextProperties v-if="showProperties.font" :element="element" />
        <PaddingBorderProperties
          v-if="showProperties.border"
          :element="element"
        />
        <SizeProperties v-if="showProperties.size" :element="element" />
      </div>

      <div>
        <i
          @click="removeElement"
          v-if="data.id !== 'layout'"
          class="pi pi-trash text-red-500 text-xl cursor-pointer"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive, watch } from "vue";

import GlobalProperties from "./GlobalProperties.vue";
import TextProperties from "./TextProperties.vue";
import SizeProperties from "./SizeProperties.vue";
import PaddingBorderProperties from "./PaddingBorderProperties.vue";

const props = defineProps(["element"]);
const watchElement = computed(() => props.element);

const showProperties = reactive({
  background: true,
  color: true,
  border: true,
  font: true,
  textField: true,
  padding: true,
  size: true,
});

const data = ref(null);

watch(watchElement, () => {
  if (props.element) {
    setProperty();
  }
});

onMounted(() => {
  if (props.element) {
    setProperty();
  }
});

const setProperty = () => {
  data.value = props.element;
  const tag = data.value.tagName;

  Object.keys(showProperties).forEach((key) => {
    showProperties[key] = true;
  });

  if (tag == "DIV") {
    // Shape
    showProperties.font = false;
    showProperties.textField = false;
    showProperties.color = false;

    //Show the padding and margin properties if it's the layout
    showProperties.padding = data.value.id !== "layout";
    showProperties.margin = data.value.id !== "layout";
  } else if (tag == "P" || tag == "H4") {
    //Text
    showProperties.background = false;
    showProperties.border = false;
    showProperties.padding = false;
  } else if (tag == "I") {
    // Icon
    Object.keys(showProperties).forEach((key) => {
      showProperties[key] = false;
    });
    showProperties.color = true;
    showProperties.font = true;
  } else if (tag == "IMG") {
    Object.keys(showProperties).forEach((key) => {
      showProperties[key] = false;
    });
    showProperties.size = true;
  }
};

const removeElement = () => {
  if (data.value) {
    const layout = document.getElementById("layout");
    layout.removeChild(data.value);
    data.value = null;
  }
};
</script>

<style></style>
