<template>
  <div class="flex items-center gap-2 border p-2">
    <span class="cursor-pointer" @click="toggle.padding = !toggle.border"
      >Border</span
    >

    <input
      v-if="toggle.border"
      @input="udpateBorder('borderWidth')"
      type="number"
      class="w-10 h-7 border focus:outline-none text-[#a670ff] text-center"
      v-model="properties.borderWidth"
    />
    <input
      v-if="toggle.border"
      @input="udpateBorder('borderColor')"
      class="w-8 h-7 hover:border-[#a670ff]"
      type="color"
      id="colorPicker"
      v-model="properties.borderColor"
    />
    <span
      v-if="toggle.border"
      class="cursor-pointer"
      @click="toggle.border = !toggle.border"
      >Rounded</span
    >
    <input
      v-if="toggle.border"
      @input="udpateBorder('borderRadius')"
      type="number"
      class="w-10 h-7 border focus:outline-none text-[#a670ff] text-center"
      v-model="properties.borderRadius"
    />
    <i
      @click="toggle.border = !toggle.border"
      class="text-lg text-gray-700 cursor-pointer"
      :class="[toggle.border ? 'pi pi-angle-left' : 'pi pi-angle-right']"
    ></i>
  </div>

  <div class="flex items-center gap-2 border p-2">
    <span class="cursor-pointer" @click="toggle.padding = !toggle.padding"
      >Padding</span
    >

    <input
      v-if="toggle.padding"
      @input="updatePadding('paddingY', $event.target.value)"
      type="number"
      class="w-10 h-7 border focus:outline-none text-[#a670ff] text-center"
      v-model="properties.paddingTop"
    />
    <input
      v-if="toggle.padding"
      @input="updatePadding('paddingX', $event.target.value)"
      type="number"
      class="w-10 h-7 border focus:outline-none text-[#a670ff] text-center"
      v-model="properties.paddingLeft"
    />

    <i
      @click="toggle.padding = !toggle.padding"
      class="text-lg text-gray-700 cursor-pointer"
      :class="[toggle.padding ? 'pi pi-angle-left' : 'pi pi-angle-right']"
    ></i>
  </div>
</template>

<script setup>
import { onMounted, computed, reactive, ref, watch } from "vue";

const props = defineProps(["element"]);

const toggle = reactive({
  border: false,
  padding: false,
});

const data = ref(null);
const properties = reactive({
  borderColor: null,
  borderWidth: null,
  borderRadius: null,
  paddingTop: null,
  paddingLeft: null,
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
    properties[key] =
      key !== "borderColor"
        ? data.value.style[key]
        : parseInt(data.value.style[key], 10);
  });
};

const udpateBorder = (type) => {
  data.value.style[type] =
    type == "borderColor" ? properties[type] : properties[type] + "px";
};

const updatePadding = (type, value) => {
  if (type == "paddingX") {
    properties.paddingLeft = value;
    data.value.style.padding = `${properties.paddingTop}px ${properties.paddingLeft}px`;
  } else {
    properties.paddingTop = value;
    data.value.style.padding = `${properties.paddingTop}px ${properties.paddingLeft}px`;
  }
};
</script>

<style></style>
