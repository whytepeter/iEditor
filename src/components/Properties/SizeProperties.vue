<template>
  <div class="flex items-center gap-2 border p-2">
    <span>Width</span>

    <input
      @input="updateSize('width', $event.target.value)"
      type="number"
      class="w-12 h-7 border focus:outline-none text-[#a670ff] text-center"
      v-model="properties.width"
    />
  </div>

  <div class="flex items-center gap-2 border p-2">
    <span>Height</span>

    <input
      @input="updateSize('height', $event.target.value)"
      type="number"
      class="w-12 h-7 border focus:outline-none text-[#a670ff] text-center"
      v-model="properties.height"
    />
  </div>
</template>

<script setup>
import { onMounted, computed, reactive, ref, watch } from "vue";

const props = defineProps(["element"]);

const data = ref(null);
const properties = reactive({
  width: 10,
  height: null,
});

const watchElement = computed(() => props.element);

watch(watchElement, () => {
  if (props.element) {
    setProperty();
  }
});

onMounted(() => {
  setProperty();
});

const setProperty = () => {
  data.value = props.element;

  Object.keys(properties).forEach((key) => {
    properties[key] = parseInt(data.value.style[key], 10);
  });
};

const updateSize = (type) => {
  data.value.style[type] = properties[type] + "px";
  data.value.style.maxWidth = "98%";
  data.value.style.maxHeight = "98%";
};
</script>

<style></style>
