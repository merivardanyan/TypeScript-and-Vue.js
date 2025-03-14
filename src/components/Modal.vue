<!-- Modal.vue -->
<script setup lang="ts">
import { defineEmits } from "vue";

import "../styles/modal.css";
const emit = defineEmits<{
  (event: "close"): void;
}>();

// Method to close the modal
const closeModal = () => {
  emit("close");
};
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <p>🎉 Thank you for your purchase!</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

