import { ref, computed, watchEffect } from "vue";
import type { Product } from "../api/ecwid";

const cart = ref<Product[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
const addToCart = (product: Product) => {
  const pickedClone = JSON.parse(JSON.stringify(product.picked));

  const cart_item = cart.value.find((item) => {
    return (
      item.id === product.id &&
      JSON.stringify(item.picked) === JSON.stringify(pickedClone)
    );
  });

  if (cart_item) {
    cart_item.quantity = (cart_item.quantity || 0) + 1;
  } else {
    const productToAdd = { 
      ...product, 
      quantity: 1,
      picked: pickedClone,
    };
    cart.value.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cart.value));
};
const changeQuantity = (quantity: number, product: Product) => {
  const cartItemIndex = cart.value.findIndex((item) => {
    return (
      item.id === product.id &&
      JSON.stringify(item.picked) === JSON.stringify(product.picked)
    );
  });

  if (cartItemIndex !== -1) {
    const cart_item = cart.value[cartItemIndex];
    if (cart_item.quantity && cart_item.quantity + quantity > 0) {
      cart.value[cartItemIndex].quantity = cart_item.quantity + quantity;
    } else {
      cart.value.splice(cartItemIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
};

const removeFromCart = (index: number) => {
  cart.value.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

const cartCount = computed(() => cart.value.reduce((acc, item) => acc + (item.quantity || 1), 0));

watchEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
});

export function useCart() {
  return { cart, addToCart, removeFromCart, changeQuantity, cartCount };
}
