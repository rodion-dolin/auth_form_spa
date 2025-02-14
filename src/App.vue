<template>
  <header>
    <Notifications />
    <select v-model="$i18n.locale">
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
    <button @click="toggleTheme" class="input-button">{{ currentTheme }}</button>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import Notifications from "@/components/Notifications.vue";

const currentTheme = ref('Light');

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'Light' ? 'Dark' : 'Light';
  document.body.className = currentTheme.value.toLowerCase();
}
</script>

<style scoped>
  header {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 10px;
  }
</style>
