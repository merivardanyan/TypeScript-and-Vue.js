<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchProductsByCategory, type Product as EcwidProduct } from "../api/ecwid";
import ProductList from "../components/product/ProductList.vue";

import "../assets/style.css";

const route = useRoute();
const categoryId = route.params.id as string; 
const categoryName = ref("");
const category_products = ref<EcwidProduct[]>([]); 
const loading = ref(true); 
const error = ref<string | null>(null);
  onMounted(async () => {
  try {
    const products = await fetchProductsByCategory(categoryId);

    category_products.value = products.map((product: EcwidProduct) => product);
    
    const categoryData = await fetchCategoryData(categoryId);
    categoryName.value = categoryData.name;
  } catch (err) {
    error.value = "Failed to fetch products or category data.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const fetchCategoryData = async (categoryId: string) => {
  try {
    const response = await fetch(
      `https://app.ecwid.com/api/v3/108362264/categories/${categoryId}?token=public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Error fetching category data");
  }
};

</script>

<template>
  <div class="category-page">
    <h1>{{ categoryName }}</h1>
    <div class="products">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="!loading && !error && category_products.length === 0" class="no-products">
        No products available in this category.
      </div>
      <div v-if="!loading && !error && category_products.length > 0">
        <ProductList :products="category_products" />
      </div>
    </div>
  </div>
</template>
