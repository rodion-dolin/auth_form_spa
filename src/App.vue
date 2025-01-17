<template>
  <header>
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

const currentTheme = ref('Light');

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'Light' ? 'Dark' : 'Light';
  document.body.className = currentTheme.value.toLowerCase();
}
</script>
