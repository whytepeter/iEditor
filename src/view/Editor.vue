<template>
  <div
    class="h-screen ml-80 w-full flex items-center flex-col gap-4 justify-center"
  >
    <div
      @click="selectedElement"
      @dragover.prevent
      @drop="onDrop($event)"
      class="w-[550px] h-[550px] bg-slate-600 relative overflow-hidden"
    ></div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const draggingElement = ref(null);
const activeElement = ref(null);

const onDrop = (e) => {
  //   console.log(e);

  const res = JSON.parse(e.dataTransfer.getData("element"));
  const { isNew, element, icon, type } = res;

  let data = isNew ? document.createElement(element) : draggingElement.value;

  const offsetX = e.offsetX;
  const offsetY = e.offsetY;

  console.log(offsetX, offsetY);

  data.style.left = offsetX - 40 + "px";
  data.style.top = offsetY + "px";

  addDefaultStyles(data, type);

  if (isNew) {
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
  }
};

const selectedElement = (e) => {
  //   console.log(e);
  //   activeElement.value = e.target;
  //   e.target.classList.add("selected");
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
  }
};
</script>

<style scope>
.selected {
  border: 2px solid #a670ff;
}
</style>
