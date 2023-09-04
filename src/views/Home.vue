<template>
  <div class="w-full p-10 items-center justify-center flex flex-col gap-6">
    <button
      @click="createNew"
      class="bg-[#A670FF] py-4 text-lg px-8 rounded-lg text-white"
    >
      New Popup

      <i class="pi pi-plus ml-2"></i>
    </button>

    <div
      v-if="allPopups"
      class="text-sm w-full md:w-10/12 mx-auto text-gray-600 flex flex-col gap-4"
    >
      <h1 class="text-xl">Recent Popups</h1>

      <div class="w-full grid grid-cols-5 gap-4">
        <div
          @click="openPopup(popup)"
          class="p-4 py-6 border border-[#A670FF] text-center text-lg rounded cursor-pointer"
          v-for="popup in allPopups"
          :key="popup.id"
        >
          {{ popup.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const allPopups = computed(() => {
  return JSON.parse(localStorage.getItem("database") ?? "[]");
});

const createNew = () => {
  const defaultTemplate = `<div xmlns="http://www.w3.org/1999/xhtml" id="layout" class="relative overflow-hidden mx-auto min-w-[350px] min-h-[350px] md:w-[450px] md:h-[450px]" style="background: rgb(243, 143, 112); border-radius: 1000px;"><div draggable="true" type="Shape" style="left: 22.5px; top: 20px; background: rgb(243, 143, 111); width: 406px; height: 406px; position: absolute; max-width: 96%; max-height: 96%; border-radius: 1000px; border-color: rgb(255, 255, 255); border-width: 3px;" class="selected"></div><i class="pi pi-star-fill" draggable="true" type="icon" style="left: 198px; top: 38px; font-size: 33px; color: rgb(213, 127, 98); position: absolute;"></i><i class="pi pi-star-fill" draggable="true" type="icon" style="left: 137px; top: 59px; font-size: 26px; color: rgb(213, 126, 98); position: absolute;"></i><i class="pi pi-star-fill" draggable="true" type="icon" style="left: 264px; top: 55px; font-size: 26px; color: rgb(213, 126, 98); position: absolute;"></i><h4 draggable="true" type="Heading" style="left: 65px; top: 100px; font-size: 26px; font-weight: bold; color: rgb(255, 255, 255); max-width: 96%; line-height: 1.1; position: absolute; text-align: center; width: 325px; max-height: 96%;" class="">All the text and elements in this popup should be editable and dragable</h4><input placeholder="E-mail" draggable="true" type="Fields" style="left: 59px; top: 207px; padding: 10px 20px; color: rgb(21, 0, 55); outline: none; border-radius: 10px; font-size: 19px; position: absolute; width: 343px; max-width: 96%; max-height: 96%; background: rgb(255, 255, 255);" class="" /><button draggable="true" type="Button" style="left: 63px; top: 272px; padding: 10px 20px; color: rgb(255, 255, 255); background: rgb(82, 82, 82); border-radius: 10px; font-size: 20px; position: absolute; font-weight: bold; text-align: center; width: 327px; max-width: 96%; max-height: 96%;" class="">SIGN UP NOW</button><p draggable="true" type="Text" style="left: 205px; top: 232px; font-size: 16px; color: rgb(255, 255, 255); max-width: 100%; position: absolute;">Text</p><p draggable="true" type="Text" style="left: 102px; top: 334px; font-size: 14px; color: rgb(255, 255, 255); max-width: 100%; position: absolute;" class="">No credit card required. No Surprises</p></div>`;

  const newPopup = {
    name: "Untitled",
    id: generateID(),
    element: defaultTemplate,
  };

  localStorage.setItem("draft", JSON.stringify(newPopup));

  router.push("/editor");
};

const openPopup = (popup) => {
  router.push(`/editor?id=${popup.id}`);
};

function generateID() {
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from(
    { length: 10 },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
}
</script>

<style></style>
