<script setup lang="ts">
import { defineProps } from "vue";
import type { Category } from "../../api/ecwid";
import { useRouter } from "vue-router";

const props = defineProps<{ categories: Category[] }>();
const router = useRouter();

const goToCategory = (id: number) => {
  router.push(`/category/${id}`);
};
</script>

<template>
  <div class="category-list row">
    <div v-for="category in props.categories" :key="category.id" class="col category-card" @click="goToCategory(category.id)">
      <div class="wrapper">
        <picture>
          <img v-if="category.imageUrl" :src="category.imageUrl" alt="Category Image" />
        </picture>
        <div class="title-3">
          <div>{{ category.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>