<template>
  <div
    v-if="notificationMessage"
    :class="['notification-container', notificationTypeClass]"
  >
    {{ notificationMessage }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const notificationMessage = computed(() => store.state.notificationMessage);
const notificationTypeClass = computed(() => {
  return store.state.notificationType === 'error' ? 'notification-error' : 'notification-success';
});
</script>

<style scoped>
.notification-container {
  position: absolute; /* Абсолютное позиционирование */
  top: 10px; /* Отступ сверху */
  left: 50%; /* Центровка по горизонтали */
  transform: translateX(-50%); /* Центровка с учетом ширины */
  z-index: 999; /* Перекрытие других элементов */
  max-width: 400px; /* Максимальная ширина уведомления */
  width: calc(100% - 20px); /* Адаптируемая ширина */
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.notification-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.notification-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
