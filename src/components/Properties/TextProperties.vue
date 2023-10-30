<template>
  <select
    v-if="data"
    v-model="data.style.fontFamily"
    class="w-44 h-8 border focus:outline-none focus:border-[#a670ff] p-2"
  >
    <option v-for="font in fontFamilies" :key="font.value" :value="font.value">
      {{ font.label }}
    </option>
  </select>
  <input
    v-if="data"
    class="w-8 h-8 hover:border-[#a670ff]"
    type="color"
    id="colorPicker"
    @input="updateProperty('color', $event.target.value)"
    v-model="data.style.color"
  />

  <div class="flex items-center gap-2">
    <button
      @click="updateFontSize('subtract')"
      class="p-2 border w-8 h-8 flex items-center justify-center hover:border-[#a670ff]"
    >
      <i class="pi pi-minus text-xs"></i>
    </button>
    <input
      @input="updateFontSize('default')"
      class="w-7 focus:outline-none text-[#a670ff] text-center"
      v-model="properties.fontSize"
    />
    <button
      @click="updateFontSize('add')"
      class="p-2 border w-8 h-8 flex items-center justify-center hover:border-[#a670ff]"
    >
      <i class="pi pi-plus text-xs"></i>
    </button>
  </div>

  <div class="flex items-center gap-4">
    <span
      @click="updateFormat('fontWeight', 'bold')"
      :class="
        properties.fontWeight == 'bold'
          ? 'text-[#a670ff] font-bold'
          : 'text-gray-500'
      "
      class="text-lg cursor-pointer"
      >B</span
    >
    <span
      @click="updateFormat('fontStyle', 'italic')"
      :class="
        properties.fontStyle == 'italic'
          ? 'text-[#a670ff] font-bold'
          : 'text-gray-500'
      "
      class="text-lg cursor-pointer italic"
      >I</span
    >
    <span
      @click="updateFormat('textDecoration', 'underline')"
      :class="
        properties.textDecoration == 'underline'
          ? 'text-[#a670ff] font-bold'
          : 'text-gray-500'
      "
      class="text-lg cursor-pointer underline"
      >U</span
    >

    <div class="flex items-center gap-2">
      <i
        class="cursor-pointer pi pi-sort-amount-down text-lg text-gray-500"
      ></i>

      <input
        @input="updateProperty('lineHeight', $event.target.value)"
        type="number"
        class="w-8 h-7 border focus:outline-none text-[#a670ff] text-center"
        v-model="properties.lineHeight"
      />
    </div>

    <i
      v-for="align in alignments"
      :key="align.title"
      @click="updateProperty('textAlign', align.title)"
      :class="[
        properties.textAlign == align.title
          ? 'text-[#a670ff] font-bold'
          : 'text-gray-500',
        align.icon,
      ]"
      class="text-lg cursor-pointer"
    ></i>
  </div>
</template>

<script setup>
import { onMounted, computed, reactive, ref, watch } from "vue";

const props = defineProps(["element"]);

const data = ref(null);
const properties = reactive({
  fontFamily: null,
  fontSize: 10,
  fontWeight: null,
  fontStyle: null,
  textDecoration: null,
  lineHeight: null,
  textAlign: null,
  color: null,
});

const alignments = reactive([
  {
    title: "left",
    icon: "pi pi-align-left",
  },
  {
    title: "center",
    icon: "pi pi-align-center",
  },
  {
    title: "right",
    icon: "pi pi-align-right",
  },
]);

const fontFamilies = reactive([
  {
    label: "Arial",
    value: "Arial, sans-serif",
  },
  {
    label: "Verdana",
    value: "Verdana, sans-serif",
  },
  {
    label: "Georgia",
    value: "Georgia, serif",
  },
  {
    label: "Times New Roman",
    value: "Times New Roman, serif",
  },
  {
    label: "Courier New",
    value: "Courier New, monospace",
  },
]);

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

  properties.fontSize = parseInt(data.value.style.fontSize, 10);
  properties.lineHeight = parseInt(data.value.style.lineHeight, 10);
};

const updateFontSize = (type) => {
  if (type == "add") {
    properties.fontSize++;
  } else if (type == "subtract" && properties.fontSize > 6) {
    properties.fontSize--;
  } else if (type == "default") {
    data.value.style.fontSize = properties.fontSize + "px";
  }

  data.value.style.fontSize = properties.fontSize + "px";
};

const updateFormat = (property, value) => {
  properties[property] = properties[property] == value ? "" : value;
  data.value.style[property] = properties[property];
};

const updateProperty = (property, value) => {
  properties[property] = value;
  data.value.style[property] = properties[property];
};
</script>

<style></style>
