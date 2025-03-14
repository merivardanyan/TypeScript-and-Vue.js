<script setup lang="ts">
import { defineProps } from "vue";
import CartItem from "./CartItem.vue";
import type { Product } from "../../api/ecwid";

defineProps<{ cart: Product[] }>();
</script>

<template>
  <div class="wrapper">
    <CartItem v-for="(item, index) in cart" :key="index" :item="item" :index="index" />
  </div>
</template>
