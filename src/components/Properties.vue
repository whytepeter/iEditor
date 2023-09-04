<template>
  <div class="bg-white px-4 py-2 my-4 border-b w-full text-[#2E2E2E] text-sm">
    <div v-if="data" class="flex items-center gap-2 justify-between">
      <div class="flex items-center gap-4 flex-wrap">
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
        <input
          v-if="showProperties.color"
          class="w-8 h-8 hover:border-[#a670ff]"
          type="color"
          id="colorPicker"
          @input="updateProperty('color', $event.target.value)"
          v-model="data.style.color"
        />
        <div v-if="showProperties.font" class="flex items-center gap-2">
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

        <div v-if="showProperties.font" class="flex items-center gap-4">
          <span
            @click="updateProperty('fontWeight', 'bold')"
            :class="
              properties.fontWeight == 'bold'
                ? 'text-[#a670ff] font-bold'
                : 'text-gray-500'
            "
            class="text-lg cursor-pointer"
            >B</span
          >
          <span
            @click="updateProperty('fontStyle', 'italic')"
            :class="
              properties.fontStyle == 'italic'
                ? 'text-[#a670ff] font-bold'
                : 'text-gray-500'
            "
            class="text-lg cursor-pointer italic"
            >I</span
          >
          <span
            @click="updateProperty('textDecoration', 'underline')"
            :class="
              properties.textDecoration == 'underline'
                ? 'text-[#a670ff] font-bold'
                : 'text-gray-500'
            "
            class="text-lg cursor-pointer underline"
            >U</span
          >
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

        <!-- /////Border///// -->
        <div
          v-if="showProperties.border"
          class="flex items-center gap-2 border p-2"
        >
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

        <!-- /////Padding///// -->
        <div
          v-if="showProperties.padding"
          class="flex items-center gap-2 border p-2"
        >
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

        <!-- //////// Size ////// -->
        <div
          v-if="showProperties.size"
          class="flex items-center gap-2 border p-2"
        >
          <span class="cursor-pointer" @click="toggle.padding = !toggle.padding"
            >Width</span
          >

          <input
            @input="updateSize('width', $event.target.value)"
            type="number"
            class="w-12 h-7 border focus:outline-none text-[#a670ff] text-center"
            v-model="properties.width"
          />
        </div>

        <div
          v-if="showProperties.size"
          class="flex items-center gap-2 border p-2"
        >
          <span class="cursor-pointer" @click="toggle.padding = !toggle.padding"
            >Height</span
          >

          <input
            @input="updateSize('height', $event.target.value)"
            type="number"
            class="w-12 h-7 border focus:outline-none text-[#a670ff] text-center"
            v-model="properties.height"
          />
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

const toggle = reactive({
  border: false,
  padding: false,
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
const properties = reactive({});

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
  const tag = data.value.tagName;

  Object.keys(data.value.style).forEach((key) => {
    // if (data.value.style[key]) {
    properties[key] = data.value.style[key];
    // }
  });

  properties.width = parseInt(data.value.style.width, 10);
  properties.height = parseInt(data.value.style.height, 10);
  properties.paddingLeft = parseInt(data.value.style.paddingLeft, 10);
  properties.paddingTop = parseInt(data.value.style.paddingTop, 10);
  properties.fontSize = parseInt(data.value.style.fontSize, 10);
  properties.borderWidth = parseInt(data.value.style.borderWidth, 10);
  properties.borderRadius = parseInt(data.value.style.borderRadius, 10);

  properties.textField =
    data.value.tagName == "INPUT"
      ? data.value.placeholder
      : data.value.innerText;

  Object.keys(showProperties).forEach((key) => {
    showProperties[key] = true;
  });

  if (tag == "DIV") {
    showProperties.font = false;
    showProperties.textField = false;
    showProperties.color = false;
    showProperties.padding = data.value.id !== "layout";
    showProperties.size = data.value.id !== "layout";
  } else if (tag == "P" || tag == "H4") {
    showProperties.background = false;
    showProperties.border = false;
    showProperties.padding = false;
  } else if (tag == "I") {
    Object.keys(showProperties).forEach((key) => {
      showProperties[key] = false;
    });
    showProperties.color = true;
    showProperties.font = true;
  }

  console.log(showProperties, properties, tag);
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

const udpateBorder = (type) => {
  data.value.style[type] =
    type == "borderColor" ? properties[type] : properties[type] + "px";
};
const updateSize = (type) => {
  data.value.style[type] = properties[type] + "px";
  data.value.style.maxWidth = "90%";
  data.value.style.maxHeight = "90%";
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

const updateTextField = () => {
  if (data.value.tagName == "INPUT") {
    data.value.placeholder = properties.textField;
  } else {
    data.value.innerText = properties.textField;
  }
};

const updateProperty = (property, value) => {
  properties[property] = value;
  data.value.style[property] = properties[property];
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
