<script setup lang="ts">
import { defineProps } from "vue";
import type { Product } from "../../api/ecwid";
import ProductCard from "./ProductCard.vue";
defineProps<{ products: Product[] }>();
</script>

<template>
  <div class="product-list row flex-wrap">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

