<script setup lang="ts">
import { ref, defineProps } from "vue";

defineProps<{ name: string; price_show: string; description: string; taxRate: number; taxPrice: number }>();
const isOpened = ref(false);

function toggleDescription() {
  isOpened.value = !isOpened.value;
}
</script>

<template>
  <div class="info">
    <div class="title-3">{{ name }}</div>
    <div class="price">{{ price_show }}</div>
    <div class="tax">{{ taxRate }}% tax price is {{ taxPrice.toFixed(2) }}</div>
    <div class="desc">
      <div v-html="description" :class="{ opened: isOpened }" class="desc-wrapper"></div>
      <span class="show_more" @click="toggleDescription">{{ isOpened ? 'Show Less' : 'Show More' }}</span>
    </div>
  </div>
</template>
