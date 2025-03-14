<script setup lang="ts">
import { defineProps } from "vue";
import type { Product } from "../../api/ecwid";
import { useRouter } from "vue-router";
import { useCart } from "../../composables/useCart";

defineProps<{ item: Product; index: number }>();
const router = useRouter();
const { removeFromCart, changeQuantity } = useCart();

const goToProduct = (id: number) => {
  router.push(`/product/${id}`);
};
</script>

<template>
  <div class="cart-item" v-if="item.quantity">
    <div class="flex">
      <picture @click="goToProduct(+item.id)">
        <img :src="item.imageUrl" alt="Product Image" width="50" />
      </picture>
      <div class="info">
        <div class="flex justify-between">
          <div class="cart-title">{{ item.name }}</div>
          <div class="close" @click="removeFromCart(index)">X</div>
        </div>
        <div v-if="item.picked && item.picked.length > 0" class="options">
          <div v-for="pickedOption in item.picked" :key="pickedOption.type">
            {{ pickedOption.type }} : {{ pickedOption.value }}
          </div>
        </div>
        <div class="flex justify-between">
          <div class="quantity flex align-center">
            <div :class="{ disabled: item.quantity <= 1 || '' }" class="change_quantity"
              @click="() => { if (item.quantity && item.quantity <= 1) return; changeQuantity(-1, item) }">-</div>
            <div class="q">{{ item.quantity }}</div>
            <div class="change_quantity" @click="changeQuantity(1, item)">+</div>
          </div>
          <div class="cart-price">€{{ (item.price * item.quantity).toFixed(2) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
