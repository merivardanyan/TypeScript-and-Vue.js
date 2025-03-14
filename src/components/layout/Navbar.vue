<script setup lang="ts">
import { useCart } from "../../composables/useCart";
const { cartCount } = useCart();
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/cart">Cart ({{ cartCount }})</router-link>
  </nav>
</template>
