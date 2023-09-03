<template>
  <div
    class="bg-[#150037] z-20 fixed top-0 left-0 p-6 w-80 h-screen text-white flex flex-col gap-6"
  >
    <div class="grid grid-cols-2 gap-2 mt-2">
      <button
        :class="
          activeBlock == block ? 'border-b border-[#A670FF]' : ' opacity-50'
        "
        @click="activeBlock = block"
        class="px-4 py-2"
        v-for="block in blocks"
        :key="block"
      >
        {{ block }}
      </button>
    </div>
    <div v-show="activeBlock == 'Elements'" class="grid grid-cols-2 gap-4">
      <div
        v-for="(element, i) in elements"
        :key="i"
        class="bg-white hover:text-[#A670FF] rounded-lg text-[#150037] flex flex-col gap-2 items-center p-4 cursor-pointer"
        :draggable="true"
        @dragstart="startDrag($event, element)"
      >
        <span>icon</span>
        <span class="text-sm">{{ element.type }}</span>
      </div>
    </div>
    <div v-show="activeBlock == 'Shapes'" class="grid grid-cols-4 gap-4">
      <i
        v-for="shape in shapes"
        :key="shape.icon"
        :draggable="true"
        @dragstart="startDrag($event, shape)"
        :class="['pi', shape.icon]"
        class="text-4xl hover:text-[#A670FF] hover:cursor-pointer"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const activeBlock = ref("Elements");
const blocks = ref(["Elements", "Shapes"]);

const elements = reactive([
  {
    icon: "",
    type: "Text",
    element: "p",
  },
  {
    icon: "",
    type: "Fields",
    element: "input",
  },
  {
    icon: "",
    type: "Button",
    element: "button",
  },
  {
    icon: "",
    type: "Image",
    element: "img",
  },
]);

const shapes = reactive([
  {
    type: "shape",
    icon: "pi-star",
    element: "i",
  },
  {
    type: "shape",
    icon: "pi-star-fill",
    element: "i",
  },
  {
    type: "shape",
    icon: "pi-circle",
    element: "i",
  },
  {
    type: "shape",
    icon: "pi-circle-fill",
    element: "i",
  },
  {
    type: "shape",
    icon: "pi-heart",
    element: "i",
  },
  {
    type: "shape",
    icon: "pi-heart-fill",
    element: "i",
  },
  {
    type: "shape",
    icon: "pi-globe",
    element: "i",
  },
  {
    type: "shape",
    icon: "pi-facebook",
    element: "i",
  },
  {
    type: "shape",
    icon: "pi-github",
    element: "i",
  },
  {
    type: "shape",
    icon: "pi-google",
    element: "i",
  },
]);

const startDrag = (e, arg) => {
  const data = {
    type: arg.type,
    element: arg.element,
    icon: arg.icon ? arg.icon : null,
    isNew: true,
  };

  e.dataTransfer.setData("element", JSON.stringify(data));
};
</script>

<style></style>
