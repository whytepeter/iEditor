<template>
  <input
    v-if="showProperties.textField"
    class="w-44 h-8 border focus:outline-none focus:border-[#a670ff] p-2"
    v-model="properties.textField"
    @input="updateTextField"
  />
  <input
    v-if="showProperties.background"
    class="w-8 h-8 hover:border-[#a670ff]"
    type="color"
    id="colorPicker"
    @input="updateProperty('background', $event.target.value)"
    v-model="properties.background"
  />

  <div class="flex items-center gap-2 border p-2">
    <span class="cursor-pointer" @click="togglePosition = !togglePosition"
      >Position</span
    >
    <div v-if="togglePosition" class="text-xs flex items-center gap-2">
      <span
        @click="updatePosition('backward')"
        :class="
          properties.zIndex == 1
            ? 'cursor-not-allowed text-gray-400'
            : 'cursor-pointer text-[#a670ff]'
        "
        class="flex items-center gap-1"
      >
        <i class="pi pi-fast-backward"></i>
        Backward
      </span>
      <span
        @click="updatePosition('forward')"
        class="flex items-center gap-1 cursor-pointer text-[#a670ff]"
      >
        <i class="pi pi-fast-forward"></i>
        Forward
      </span>
    </div>
    <i
      @click="togglePosition = !togglePosition"
      class="text-lg text-gray-700 cursor-pointer"
      :class="[togglePosition ? 'pi pi-angle-left' : 'pi pi-angle-right']"
    ></i>
  </div>
</template>

<script setup>
import { onMounted, computed, reactive, ref, watch } from "vue";

const props = defineProps(["element", "showProperties"]);

const togglePosition = ref(false);
const data = ref(null);
const properties = reactive({
  textField: null,
  background: null,
  zIndex: 1,
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
    properties[key] = data.value.style[key];
  });

  properties.zIndex = parseInt(data.value.style.zIndex, 10) || 1;

  properties.textField =
    data.value.tagName == "INPUT"
      ? data.value.placeholder
      : data.value.innerText;
};

const updateTextField = () => {
  if (data.value.tagName == "INPUT") {
    data.value.placeholder = properties.textField;
  } else {
    data.value.innerText = properties.textField;
  }
};

const updatePosition = (arg) => {
  console.log(properties.zIndex);
  if (arg == "backward" && properties.zIndex > 1) {
    properties.zIndex--;
  } else if (arg == "forward") {
    properties.zIndex++;
  }
  data.value.style.zIndex = properties.zIndex;
};

const updateProperty = (property, value) => {
  properties[property] = value;
  data.value.style[property] = properties[property];
};
</script>

<style></style>
