<script setup lang="ts">
import { defineProps } from "vue";
import type { Product } from "../../api/ecwid";

defineProps<{ product: Product }>();
const emit = defineEmits(["pickChoice"]);

function pickChoice(type: string, value: string, p: Product) {
  const picked = p.picked?.find(e => e.type === type)
  picked ? picked.value = value : p.picked?.push({ type, value })

}

</script>

<template>
  <div v-for="option in product.options" :key="option.type" class="options">
    <div class="title-3">{{ option.type }}</div>
    <div class="type flex">
      <div v-for="choice in option.choices" :key="choice.text" class="choice">
        <div
          :class="{ picked: product.picked?.some(p => p.type === option.type && (p.value === choice.text)) }"
          @click="pickChoice(option.type, choice.text, product)" class="choice-wrapper">
          {{ choice.text }}
      </div>
    </div>
  </div>
  </div>
</template>
