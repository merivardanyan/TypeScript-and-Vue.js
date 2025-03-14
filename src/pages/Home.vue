<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchCategories, fetchProducts, type Category, type Product } from "../api/ecwid";
import CategoryList from "../components/category/CategoryList.vue";
import ProductList from "../components/product/ProductList.vue";
import "../assets/style.css";

const categories = ref<Category[]>([]);
const products = ref<Product[]>([]);

onMounted(async () => {
  categories.value = await fetchCategories();
  products.value = await fetchProducts();
});
</script>

<template>
  <div class="container">

    <div class="row">
      <div class="col">
        <div class="wrapper"><div class="title-1">Categories</div></div>
      </div>
    </div>
    <CategoryList :categories="categories" />
    
    <div class="row">
      <div class="col">
        <div class="wrapper"><div class="title-1">Products</div></div>
      </div>
    </div>
    <ProductList :products="products" />
  </div>
</template>


