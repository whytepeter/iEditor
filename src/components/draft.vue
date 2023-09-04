<template>
  <div class="bg-white p-4 mb-4 border-b w-full">
    <div v-if="data" class="flex items-center gap-2 flex-wrap">
      <input
        v-if="properties.background"
        class="w-8 h-8 hover:border-[#a670ff]"
        type="color"
        id="colorPicker"
        v-model="properties.background"
      />
      <input
        v-if="data.style.color"
        class="w-8 h-8 hover:border-[#a670ff]"
        type="color"
        id="colorPicker"
        v-model="data.style.color"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive, watch, Vue } from "vue";

const props = defineProps(["element"]);

const watchElement = computed(() => props.element);

const data = ref(null);
const properties = ref({});

watch(watchElement, () => {
  if (props.element) {
    setElement();
  }
});

onMounted(() => {
  if (props.element) {
    setElement();
  }
});

const setElement = () => {
  Vue.set(data, "style", {});

  Object.keys(props.element).forEach((key) => {
    Vue.set(properties, key, props.element.style[key]);
  });

  Vue.set(data.style, "color", props.element.style.color);
};

const updateProperty = (property, value) => {
  data.value.style[property] = value;
};
</script>

<style></style>
