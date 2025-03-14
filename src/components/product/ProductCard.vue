<script setup lang="ts">
import { defineProps } from "vue";
import type { Product } from "../../api/ecwid";
import { useRouter } from "vue-router";
defineProps<{ product: Product }>();
const router = useRouter();
import "../../styles/ProductCard.css";


const goToProduct = (id: number) => {
  router.push(`/product/${id}`);
};
</script>

<template>
  <div class="product col" @click="goToProduct(+product.id)">
    <div class="wrapper">
      <picture>
        <img v-if="product.imageUrl" :src="product.imageUrl" alt="Product Image" />
      </picture>
      <div class="title-3">
        <div>{{ product.name }}</div>
        <div class="price">{{ product.defaultDisplayedLowestPriceFormatted }}</div>
      </div>
    </div>
  </div>
</template>