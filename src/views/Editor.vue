<template>
  <div
    class="h-screen ml-72 w-full flex items-center flex-col gap-4 justify-center relative"
  >
    <Properties :element="activeElement" />

    <div
      @mousemove="trackmouse"
      @click="selectedElement"
      @dragover.prevent
      @drop="onDrop($event)"
      ref="layout"
      id="layout"
      style="width: 550px; height: 550px; background: #f38f70"
      class="relative overflow-hidden"
    ></div>
  </div>
</template>

<script setup>
import Properties from "../components/Properties.vue";
import { ref, reactive, onMounted } from "vue";

const draggingElement = ref(null);
const activeElement = ref(null);
const layout = ref(null);
const leftCorrection = ref(0);
const topCorrection = ref(0);

const onDrop = (e) => {
  const res = JSON.parse(e.dataTransfer.getData("element"));
  const { isNew, element, icon, type } = res;

  let data = isNew ? document.createElement(element) : draggingElement.value;

  const layoutRect = layout.value.getBoundingClientRect();
  const offsetX = e.clientX - layoutRect.left - leftCorrection.value;
  const offsetY = e.clientY - layoutRect.top - topCorrection.value;

  console.log(e);

  data.style.left = offsetX + "px";
  data.style.top = offsetY + "px";

  if (isNew) {
    addDefaultStyles(data, type);
    data.style.position = "absolute";

    if (icon) {
      data.classList.add("pi", icon);
    }

    data.setAttribute("draggable", "true");
    data.setAttribute("type", type);
    data.addEventListener("dragstart", startDrag);
    data.addEventListener("click", selectedElement);

    e.target.appendChild(data);

    activeElement.value = data;
  }
};

const selectedElement = (e) => {
  //   console.log(e);
  const clickedElement = e.target;
  if (activeElement.value !== clickedElement) {
    if (activeElement.value) {
      activeElement.value.classList.remove("selected");
    }
  }
  activeElement.value = clickedElement;
  clickedElement.classList.add("selected");
};

const addResizeableNodes = (e) => {
  const element = e.target;
};

const startDrag = (e) => {
  draggingElement.value = e.target;
  const data = {
    type: e.target.getAttribute("type"),
    isNew: false,
  };

  e.dataTransfer.setData("element", JSON.stringify(data));
};

const addDefaultStyles = (el, type, name) => {
  console.log(el, type);

  if (type == "Button") {
    el.style.padding = "10px 20px";
    el.style.color = "#ffff";
    el.style.background = "#A670FF";
    el.style.borderRadius = "7px";
    el.style.fontSize = "16px";
    el.innerText = type;
  } else if (type == "Fields") {
    el.style.padding = "10px 20px";
    el.style.color = "#150037";
    el.style.outline = "none";
    el.style.borderRadius = "7px";
    el.style.fontSize = "16px";
    el.setAttribute("placeholder", "Text input");
  } else if (type == "Text") {
    el.style.fontSize = "16px";
    el.style.color = "#ffff";
    el.style.maxWidth = "100%";
    el.style.background = null;
    el.innerText = type;
  } else if (type == "Heading") {
    el.style.fontSize = "30px";
    el.style.fontWeight = "Bold";
    el.style.color = "#ffff";
    el.style.maxWidth = "100%";
    el.style.background = null;
    el.style.lineHeight = "2.2rem";
    el.innerText = type;
  } else if (type == "icon") {
    el.style.fontSize = "30px";
    el.style.color = "#ffff";
  } else if (type == "Image") {
    el.style.objectFit = "cover";
    el.style.objectFit = "cover";

    el.style.width = "100px";
    el.style.height = "100px";
    el.setAttribute("src", "");
  } else if (type == "Shape") {
    el.style.background = "#ffff";
    el.style.width = "100px";
    el.style.height = "100px";
  }
};

const trackmouse = (e) => {
  if (e.target.id !== "layout") {
    leftCorrection.value = e.offsetX;
    topCorrection.value = e.offsetY;
  }
};

onMounted(() => {
  if (!activeElement.value) {
    activeElement.value = layout.value;
  }
});
</script>

<style scope>
.selected {
  border: 2px solid #a670ff;
}
</style>
