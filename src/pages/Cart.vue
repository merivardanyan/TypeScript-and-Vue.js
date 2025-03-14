<script setup lang="ts">
import { computed,ref } from "vue";
import { useCart } from "../composables/useCart";
import CartList from "../components/cart/CartList.vue";
import Checkout from "../components/cart/Checkout.vue";
import Modal from "../components/Modal.vue";  // Import the Modal component

import "../styles/Cart.css";

const { cart } = useCart();
const showModal = ref(false);

const placeOrder = () => {
  showModal.value = true;
  cart.value = [];
  localStorage.removeItem("cart");
};
const totalQuantity = computed(() => {
  return cart.value.reduce((total: any, item: any) => total + (item.quantity || 0), 0);
});
const totalPrice = computed(() => {
  return cart.value.reduce((total: any, item: any) => total + item.price * (item.quantity || 0), 0).toFixed(2);
});
const totalTax = computed(() => {
  return cart.value.reduce((total: any, item: any) => total + (item.price * (item.quantity || 0) * (item.tax.defaultLocationIncludedTaxRate / 100)), 0).toFixed(2);
});
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="wrapper">
        <div class="title-1">Shopping Cart</div>
      </div>
    </div>
  </div>
  <div class="row" v-if="totalQuantity>0">
    <div class="col cart-products">
      <CartList :cart="cart" />
    </div>
    <div class="col checkout">
      <Checkout :totalQuantity="totalQuantity" :totalPrice="totalPrice" :totalTax="totalTax" :placeOrder="placeOrder" :cartLength="cart.length" />
    </div>
  </div>
  <Modal v-if="showModal" @close="showModal = false" />
</template>
