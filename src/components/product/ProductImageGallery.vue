<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{ imageUrl: string; media?: { images?: { image160pxUrl: string; image1500pxUrl: string }[] } }>();
const emit = defineEmits(["changeImage"]);

function changeMainImage(newImage: string) {
  emit("changeImage", newImage);
}
</script>

<template>
  <div class="wrapper">
    <picture>
      <img :src="imageUrl" alt="Product Image" />
    </picture>
    <div v-if="media?.images" class="flex">
      <div v-for="pic in media.images" :key="pic.image160pxUrl">
        <picture>
          <img :src="pic.image160pxUrl" alt="" @click="changeMainImage(pic.image1500pxUrl)" class="thumbnail" />
        </picture>
      </div>
    </div>
  </div>
</template>
