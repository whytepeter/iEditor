<template>
  <div
    ref="editor"
    class="h-screen pt-10 md:ml-72 w-full flex flex-col gap-4 relative"
  >
    <Properties :element="activeElement" />

    <div ref="container" id="container">
      <div
        @dragover.prevent
        @mousemove="trackmouse"
        @click="selectedElement"
        @drop="onDrop"
        ref="layout"
        id="layout"
        style="background-color: antiquewhite"
        class="relative overflow-hidden mx-auto w-[450px] h-[450px]"
      ></div>
    </div>
  </div>
</template>

<script setup>
import Properties from "./Properties.vue";
import { computed, ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const draggingElement = ref(null);
const activeElement = ref(null);
const layout = ref(null);
const container = ref(null);
const leftCorrection = ref(0);
const topCorrection = ref(0);

const defaultTemplates = ref([
  `<div id="layout" class="relative overflow-hidden mx-auto w-[450px] h-[450px] selected" style="background: rgb(3, 99, 67); border-radius: 18px; width: 564px; max-width: 98%; max-height: 98%; height: 533px;"><div draggable="true" type="Shape" style="left: 139.003px; top: 11.3646px; background: rgb(0, 148, 99); width: 522px; height: 485px; position: absolute; max-width: 98%; max-height: 98%; border-radius: 24px; border-color: rgb(203, 230, 0); border-width: 5px;" class="selected"></div><i class="pi pi-star-fill" draggable="true" type="icon" style="left: 153.003px; top: 41.4635px; font-size: 34px; color: rgb(203, 230, 0); position: absolute;"></i><i class="pi pi-star-fill" draggable="true" type="icon" style="left: 206.003px; top: 45.4635px; font-size: 27px; color: rgb(203, 230, 0); position: absolute;"></i><i class="pi pi-star-fill" draggable="true" type="icon" style="left: 252.003px; top: 50.3646px; font-size: 21px; color: rgb(203, 230, 0); position: absolute;"></i><h4 draggable="true" type="Heading" style="left: 165.003px; top: 112.365px; font-size: 47px; font-weight: bold; color: rgb(203, 230, 0); max-width: 98%; line-height: 1.15; position: absolute; text-align: left; width: 17px; max-height: 98%; font-style: italic;" class="">i</h4><p draggable="true" type="Text" style="left: 452.003px; top: 470.365px; font-size: 10px; color: rgb(203, 230, 0); max-width: 100%; position: absolute; text-align: left;" class="">www.ieditor.com</p><i class="pi pi-globe" draggable="true" type="Icon" style="left: -99.9966px; top: -116.536px; font-size: 200px; color: rgb(203, 230, 0); position: absolute;"></i><h4 draggable="true" type="Heading" style="left: 184.003px; top: 113.365px; font-size: 37px; font-weight: bold; color: rgb(255, 255, 255); max-width: 100%; line-height: 1.5; position: absolute;" class="">Editor</h4><div draggable="true" type="Shape" style="left: 168.003px; top: 169.365px; background: rgb(203, 230, 0); width: 152px; height: 6px; position: absolute; max-width: 98%; max-height: 98%; border-radius: 8px;" class=""></div><i class="pi pi-globe" draggable="true" type="Icon" style="left: 435.003px; top: 470.464px; font-size: 13px; color: rgb(203, 230, 0); position: absolute;"></i><i class="pi pi-facebook" draggable="true" type="Icon" style="left: 364.003px; top: 469.365px; font-size: 13px; color: rgb(203, 230, 0); position: absolute;"></i><p draggable="true" type="Text" style="left: 382.003px; top: 469.365px; font-size: 10px; color: rgb(194, 220, 1); max-width: 100%; position: absolute;" class="">@ieditor</p><div draggable="true" type="Shape" style="left: 458.003px; top: 49.3646px; background: rgb(8, 98, 67); width: 400px; height: 400px; position: absolute; border-radius: 1000px; max-width: 98%; max-height: 98%;" class=""></div><div draggable="true" type="Shape" style="left: 481.003px; top: 74.3646px; background: rgb(0, 117, 78); width: 350px; height: 350px; position: absolute; max-width: 98%; max-height: 98%; border-radius: 1000px;" class=""></div><div draggable="true" type="Shape" style="left: 511.003px; top: 197.365px; background: rgb(0, 148, 99); width: 300px; height: 300px; position: absolute; max-width: 98%; max-height: 98%; border-width: 16px; border-radius: 1000px; border-color: rgb(203, 230, 0);" class="selected"></div><h4 draggable="true" type="Heading" style="left: 169.003px; top: 190.365px; font-size: 132px; color: rgb(203, 230, 0); max-width: 98%; position: absolute; font-weight: bold; width: 197px; max-height: 98%; line-height: 0.8;" class="">He llo</h4><i class="pi pi-heart-fill" draggable="true" type="Icon" style="left: 242.003px; top: 336.464px; font-size: 57px; color: rgb(0, 148, 99); position: absolute;"></i></div>`,
  `<div id="layout" class="relative overflow-hidden mx-auto w-[450px] h-[450px] selected" style="background: rgb(243, 143, 112); border-radius: 1000px;"><div draggable="true" type="Shape" style="left: 12.3403px; top: 13.3646px; background: rgb(243, 144, 111); width: 420px; height: 420px; position: absolute; max-width: 98%; max-height: 98%; border-radius: 10000px; border-color: rgb(255, 255, 255); border-width: 3px;" class="selected"></div><i class="pi pi-star-fill" draggable="true" type="icon" style="left: 205.007px; top: 34.3698px; font-size: 30px; color: rgb(210, 124, 96); position: absolute;"></i><i class="pi pi-star-fill" draggable="true" type="icon" style="left: 147.007px; top: 47.3646px; font-size: 26px; color: rgb(210, 124, 96); position: absolute;"></i><i class="pi pi-star-fill" draggable="true" type="icon" style="left: 264.007px; top: 49.3646px; font-size: 26px; color: rgb(210, 124, 96); position: absolute;"></i><h4 draggable="true" type="Heading" style="left: 75.0069px; top: 88.3646px; font-size: 25px; font-weight: bold; color: rgb(255, 255, 255); max-width: 98%; line-height: 1.15; position: absolute; text-align: center; width: 300px; max-height: 98%;" class="">All the text and elements in this popup should be editable and draggable</h4><input placeholder="E-mail" draggable="true" type="Fields" style="left: 54.0069px; top: 198.365px; padding: 10px 20px; color: rgb(21, 0, 55); outline: none; border-radius: 12px; font-size: 21px; position: absolute; width: 350px; max-width: 98%; max-height: 98%;" class=""><button draggable="true" type="Button" style="left: 59.0069px; top: 271.365px; padding: 10px 20px; color: rgb(255, 255, 255); background: rgb(84, 84, 84); border-radius: 11px; font-size: 22px; position: absolute; text-align: center; font-weight: bold; width: 332px; max-width: 98%; max-height: 98%;" class="">SIGN UP NOW</button><p draggable="true" type="Text" style="left: 111.007px; top: 339.365px; font-size: 14px; color: rgb(255, 255, 255); max-width: 100%; position: absolute;" class="">No credit card required. No Suprises</p></div>`,
]);

const onDrop = (e) => {
  // console.log(e);
  const layout = document.getElementById("layout");

  const res = JSON.parse(e.dataTransfer.getData("element"));
  const { isNew, element, icon, type } = res;

  let data = isNew ? document.createElement(element) : draggingElement.value;

  const layoutRect = layout.getBoundingClientRect();
  const offsetX = e.clientX - layoutRect.left - leftCorrection.value;
  const offsetY = e.clientY - layoutRect.top - topCorrection.value;

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

    layout.appendChild(data);

    activeElement.value = data;
  }
};

const addDefaultStyles = (el, type, name) => {
  // console.log(el, type);

  const defaultStyles = {
    Button: {
      padding: "10px 20px",
      color: "#ffff",
      background: "#A670FF",
      borderRadius: "7px",
      fontSize: "16px",
    },
    Fields: {
      padding: "10px 20px",
      color: "#150037",
      outline: "none",
      borderRadius: "7px",
      fontSize: "16px",
    },
    Text: {
      fontSize: "16px",
      color: "#ffff",
      maxWidth: "100%",
      background: null,
    },
    Heading: {
      fontSize: "30px",
      fontWeight: "Bold",
      color: "#ffff",
      maxWidth: "100%",
      background: null,
      lineHeight: "1.5",
    },
    Icon: {
      fontSize: "30px",
      color: "#ffff",
    },
    Shape: {
      background: "#ffff",
      width: "100px",
      height: "100px",
    },
  };

  const styles = defaultStyles[type];
  if (styles) {
    for (const prop in styles) {
      el.style[prop] = styles[prop];
    }
  }

  if (type !== "Shape" && type !== "Icon") {
    el.innerText = type;
  }
};

const selectedElement = (e) => {
  const clickedElement = e.target;
  if (activeElement.value !== clickedElement) {
    if (activeElement.value) {
      activeElement.value.classList.remove("selected");
    }
  }
  activeElement.value = clickedElement;
  clickedElement.classList.add("selected");
};

const startDrag = (e) => {
  draggingElement.value = e.target;
  const data = {
    type: e.target.getAttribute("type"),
    isNew: false,
  };

  e.dataTransfer.setData("element", JSON.stringify(data));
};

const trackmouse = (e) => {
  if (e.target.id !== "layout") {
    leftCorrection.value = e.offsetX;
    topCorrection.value = e.offsetY;
  }
};

const setTemplate = () => {
  let saved = localStorage.getItem("saved");
  let template = saved ? JSON.parse(saved) : null;

  console.log(template);
  container.value.innerHTML = template
    ? template.element
    : defaultTemplates.value[0];

  addStartDragEvent();
};

const addStartDragEvent = () => {
  const layout = document.getElementById("layout");

  layout.addEventListener("mousemove", trackmouse);
  layout.addEventListener("drop", onDrop);
  layout.addEventListener("click", selectedElement);
  layout.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  const childElements = layout.querySelectorAll("*");
  childElements.forEach((element) => {
    element.addEventListener("dragstart", startDrag);
  });
};

onMounted(() => {
  setTemplate();
});
</script>

<style scope>
.selected {
  border: 2px solid #a670ff;
}
</style>
