<template>
  <div v-if="message" class="alert-message">
    {{ message }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  message: String
});
</script>
