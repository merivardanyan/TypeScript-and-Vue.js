<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchProductById, type Product as Product } from "../api/ecwid";
import { useCart } from "../composables/useCart";

import ProductImageGallery from "../components/product/ProductImageGallery.vue";
import ProductInfo from "../components/product/ProductInfo.vue";
import ProductOptions from "../components/product/ProductOptions.vue";

const route = useRoute();
const product = ref<Product | null>(null);
const { addToCart } = useCart();

onMounted(async () => {
  const productId = String(route.params.id);
  const fetchedProduct = await fetchProductById(productId);

  const pickedOptions: { type: string; value: string }[] = [];
    const formattedOptions = fetchedProduct.options?.map(option => {
    return {
      type: option.type,
      choices: option.choices.map(choice => ({
        text: choice.text,
        value: choice.text, 
      })),
    };
  }) || [];
  formattedOptions.forEach(option => {
    if (option.choices.length > 0) {        
        pickedOptions.push({
            type: option.type,
            value: option.choices[0].value
        });
    }
});

  product.value = {
    ...fetchedProduct,
    id: fetchedProduct.id,
    picked: pickedOptions,
    description: fetchedProduct.description || "",
    tax: fetchedProduct.tax || { defaultLocationIncludedTaxRate: 0 },
    options: fetchedProduct.options || [],
  };
});
function pickChoice(type: string, choice: string) {
  if (product.value) {
    product.value.picked?.forEach(option => {
      if (option.type === type) {
        option.value = choice;
      }
    });
  }
}

function changeMainImage(mainImageUrl: string) {
  if (product.value) {
    product.value.imageUrl = mainImageUrl;
  }
}
</script>

<template>
  <div v-if="product" class="row">
    <div class="col image">
      <ProductImageGallery :imageUrl="product.imageUrl" :media="product.media" @changeImage="changeMainImage" />
    </div>

    <div class="col info-col">
      <div class="wrapper">
        <ProductInfo
          :name="product.name"
          :price_show="product.defaultDisplayedLowestPriceFormatted"
          :description="product.description || ''"
          :taxRate="product.tax.defaultLocationIncludedTaxRate"
          :taxPrice="product.price * (product.tax.defaultLocationIncludedTaxRate / 100)"
        />

        <ProductOptions :product="product" @pickChoice="pickChoice" />

        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </div>
  <p v-else>Loading...</p>
</template>
