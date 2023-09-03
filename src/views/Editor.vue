<template>
  <div
    class="h-screen ml-80 w-full flex items-center flex-col gap-4 justify-center relative"
  >
    <Properties :element="activeElement" />

    <div
      @mousemove="trackmouse"
      @click="selectedElement"
      @dragover.prevent
      @drop="onDrop($event)"
      ref="layout"
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

const onDrop = (e) => {
  console.log(e.offsetY, e.offsetX);
  const res = JSON.parse(e.dataTransfer.getData("element"));
  const { isNew, element, icon, type } = res;

  let data = isNew ? document.createElement(element) : draggingElement.value;

  const offsetX = type == "shape" ? e.offsetX - 10 : e.offsetX - 50;
  const offsetY = "shape" ? e.offsetY - 5 : e.offsetY - 15;

  data.style.left = offsetX + "px";
  data.style.top = offsetY + "px";

  if (isNew) {
    addDefaultStyles(data, type);
    data.style.position = "absolute";
    data.innerText = type !== "shape" ? type : null;

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
  activeElement.value = e.target;
  e.target.classList.add("selected");
};

const startDrag = (e) => {
  draggingElement.value = e.target;
  const data = {
    type: e.target.getAttribute("type"),
    isNew: false,
  };

  e.dataTransfer.setData("element", JSON.stringify(data));
};

const addDefaultStyles = (el, type) => {
  console.log(el, type);

  if (type == "Button") {
    el.style.padding = "10px 20px";
    el.style.color = "#ffff";
    el.style.background = "#A670FF";
    el.style.borderRadius = "7px";
    el.style.fontSize = "16px";
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
  } else if (type == "shape") {
    el.style.fontSize = "30px";
    el.style.color = "#ffff";
  } else if (type == "Image") {
    el.style.objectFit = "cover";
    el.style.objectFit = "cover";

    el.setAttribute("width", "100px");
    el.setAttribute("height", "100px");
    el.setAttribute("src", "");
  }
};

const trackmouse = (e) => {
  // console.log(e.offsetY, e.offsetX);
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
