<template>
  <div class="bg-white px-4 py-2 mb-4 border-b w-full text-[#2E2E2E] text-sm">
    <div v-if="data" class="flex items-center gap-2 justify-between">
      <div class="flex items-center gap-4 flex-wrap">
        <input
          v-if="data.style.fontSize"
          class="w-44 h-8 border focus:outline-none focus:border-[#a670ff] p-2"
          v-model="textField"
          @input="updateTextField"
        />

        <input
          v-if="data.style.background"
          class="w-8 h-8 hover:border-[#a670ff]"
          type="color"
          id="colorPicker"
          v-model="data.style.background"
        />
        <input
          v-if="data.style.color"
          class="w-8 h-8 hover:border-[#a670ff]"
          type="color"
          id="colorPicker"
          v-model="data.style.color"
        />

        <div v-if="data.style.fontSize" class="flex items-center gap-4">
          <span
            @click="updateProperty('fontWeight', 'bold')"
            :class="
              data.style.fontWeight == 'bold'
                ? 'text-[#a670ff] font-bold'
                : 'text-gray-500'
            "
            class="text-lg cursor-pointer"
            >B</span
          >
          <span
            @click="updateProperty('fontStyle', 'italic')"
            :class="
              data.style.fontStyle == 'italic'
                ? 'text-[#a670ff] font-bold'
                : 'text-gray-500'
            "
            class="text-lg cursor-pointer italic"
            >I</span
          >
          <span
            @click="updateProperty('textDecoration', 'underline')"
            :class="
              data.style.textDecoration == 'underline'
                ? 'text-[#a670ff] font-bold'
                : 'text-gray-500'
            "
            class="text-lg cursor-pointer underline"
            >U</span
          >
        </div>

        <div
          v-if="data.id == 'layout'"
          class="flex items-center gap-2 border p-2"
        >
          <span>Shape</span>
          <i
            v-for="item in shapeTypes"
            :key="item.title"
            @click="shape = item.title"
            class="text-2xl cursor-pointer"
            :class="[
              shape == item.title ? 'text-[#a670ff]' : 'text-gray-400',
              item.icon,
            ]"
          ></i>
        </div>

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

const props = defineProps(["element"]);

const watchElement = computed(() => props.element);

const shape = ref("circle");
const shapeTypes = reactive([
  {
    title: "square",
    icon: "pi pi-stop",
  },
  {
    title: "circle",
    icon: "pi pi-circle",
  },
]);

const fontSize = ref(null);
const background = ref(null);
const color = ref(null);
const textField = ref(null);

const data = ref(null);

watch(shape, () => {
  data.value.style.borderRadius = shape.value == "circle" ? "100%" : "";
});

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

  // Object.keys(properties).forEach((key) => {
  //   if (data.value.style[key]) {
  //     properties[key] = data.value.style[key];
  //   }
  // });
  // properties.textField = data.value.innerText;

  fontSize.value = parseInt(props.element.style.fontSize, 10);
  background.value = data.value.style.background;
  textField.value =
    data.value.tagName == "INPUT"
      ? data.value.placeholder
      : data.value.innerText;
  color.value = data.value.style.color;

  if (data.id == "layout") {
    data.value.style.borderRadius = shape.value == "circle" ? "100%" : "";
  }
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
  if (data.value.tagName == "INPUT") {
    data.value.placeholder = textField.value;
  } else {
    data.value.innerText = textField.value;
  }
};

const updateProperty = (property, value) => {
  data.value.style[property] =
    data.value.style[property] == value ? null : value;
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
