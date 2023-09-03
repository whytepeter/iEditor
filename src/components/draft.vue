<template>
  <div class="bg-white p-4 mb-4 border-b w-full">
    <div v-if="data" class="flex items-center gap-2 flex-wrap">
      <input
        v-if="data.tagName == 'P' || data.tagName == 'H4'"
        class="w-44 h-8 border focus:outline-none focus:border-[#a670ff] p-2"
        v-model="textField"
        @input="updateTextField"
      />

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

      <div v-if="fontSize" class="flex items-center gap-2">
        <button
          @click="updateFontSize('subtract')"
          class="p-2 border w-8 h-8 flex items-center justify-center hover:border-[#a670ff]"
        >
          <i class="pi pi-minus text-xs"></i>
        </button>
        <input
          @input="updateFontSize('default')"
          class="w-7 focus:outline-none text-[#a670ff] text-center"
          v-model="fontSize"
        />
        <button
          @click="updateFontSize('add')"
          class="p-2 border w-8 h-8 flex items-center justify-center hover:border-[#a670ff]"
        >
          <i class="pi pi-plus text-xs"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive, watch } from "vue";

const props = defineProps(["element"]);

const watchElement = computed(() => props.element);
const fontSize = ref(null);
const background = ref(null);
const color = ref(null);
const textField = ref(null);

const properties = reactive({
  fontSize: null,
  background: null,
  color: null,
  textField: null,
});

const data = ref(null);

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
  data.value = props.element;

  Object.keys(properties).forEach((key) => {
    if (data.value.style[key]) {
      properties[key] = data.value.style[key];
    }
  });
  properties.textField = data.value.innerText;

  console.log(properties);

  fontSize.value = parseInt(props.element.style.fontSize, 10);
  background.value = data.value.style.background;
  textField.value = data.value.innerText;
  color.value = data.value.style.color;
};

const updateFontSize = (type) => {
  const size = parseInt(data.value.style.fontSize, 10);
  if (type == "add") {
    data.value.style.fontSize = size + 2 + "px";
  } else if (type == "subtract" && size > 8) {
    data.value.style.fontSize = size - 2 + "px";
  } else if (type == "default") {
    console.log(type, fontSize.value);
    data.value.style.fontSize = fontSize.value + "px";
  }

  fontSize.value = parseInt(data.value.style.fontSize, 10);
};

const updateTextField = () => {
  data.value.innerText = textField.value;
};

const updateProperty = (property, value) => {
  data.value.style[property] = value;
};
</script>

<style></style>
