<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{ totalQuantity: number; totalPrice: string; totalTax: string; placeOrder: () => void; cartLength: number }>();
</script>

<template>
  <div class="wrapper">
    <div class="title-2">Checkout</div>
    <div class="total-quantity">Total Quantity: {{ totalQuantity }}</div>
    <div class="total-price">Price Without Taxes: €{{ totalPrice }}</div>
    <div class="total-tax">Tax: €{{ totalTax }}</div>
    <div class="price">Total Price: €{{ (+totalPrice + +totalTax).toFixed(2) }}</div>
    <button v-if="cartLength" @click="placeOrder">Place Order</button>
    <p v-else>Your cart is empty.</p>
  </div>
</template>
